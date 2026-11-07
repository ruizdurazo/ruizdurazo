/*
 * Enrique Ruiz Durazo
 * 2026
 *
 * Play/pause chrome for note audio and video.
 * The browser element stays in charge of playback.
 * Audio is hidden with opacity, not display:none, so Safari still plays it.
 */

const playIcon = `<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3.2 1.5v9L10.6 6 3.2 1.5z"/></svg>`
const pauseIcon = `<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.2 1.4h2.4v9.2H2.2zm5.2 0h2.4v9.2H7.4z"/></svg>`

function mountPlayers(root) {
  const scope = root || document.getElementById("note")
  if (!scope) return

  scope.querySelectorAll("audio, video").forEach((media) => {
    upgrade(media, scope)
  })
}

function upgrade(media, scope) {
  if (media.closest(".player")) return
  if (!media.getAttribute("src") && !media.querySelector("source")) return
  // Muted loops are decoration. Leave them alone.
  if (media.autoplay && media.muted) return

  const kind = media.tagName === "VIDEO" ? "video" : "audio"
  const showTime = kind === "video" || media.hasAttribute("data-time")
  const player = document.createElement("div")
  player.className = "player player--" + kind + (showTime ? " has-time" : "")

  const toggle = document.createElement("button")
  toggle.type = "button"
  toggle.className = "player__toggle"
  toggle.setAttribute("aria-label", "Play")
  toggle.innerHTML =
    '<span class="player__icon player__icon--play">' +
    playIcon +
    '</span><span class="player__icon player__icon--pause">' +
    pauseIcon +
    "</span>"

  const track = document.createElement("div")
  track.className = "player__track"
  track.setAttribute("role", "slider")
  track.setAttribute("aria-label", "Seek")
  track.setAttribute("aria-orientation", "horizontal")
  track.setAttribute("aria-valuemin", "0")
  track.setAttribute("aria-valuemax", "100")
  track.setAttribute("aria-valuenow", "0")
  track.tabIndex = 0

  const bar = document.createElement("div")
  bar.className = "player__bar"
  const fill = document.createElement("div")
  fill.className = "player__fill"
  bar.appendChild(fill)
  track.appendChild(bar)

  let time = null
  if (showTime) {
    time = document.createElement("div")
    time.className = "player__time"
    time.textContent = "0:00 / 0:00"
  }

  media.parentNode.insertBefore(player, media)
  player.appendChild(media)
  if (kind === "video") {
    const controls = document.createElement("div")
    controls.className = "player__controls"
    controls.appendChild(toggle)
    controls.appendChild(track)
    if (time) controls.appendChild(time)
    player.appendChild(controls)
  } else {
    player.appendChild(toggle)
    player.appendChild(track)
    if (time) player.appendChild(time)
  }

  media.preload = media.preload || "metadata"
  media.setAttribute("aria-hidden", "true")
  media.tabIndex = -1
  if (kind === "audio") {
    // Browsers force display:none on audio without controls, and that
    // can refuse playback. Keep controls, then hide the element.
    media.controls = true
  } else {
    media.removeAttribute("controls")
    media.controls = false
    media.setAttribute("playsinline", "")
  }

  let dragging = false

  function currentRatio() {
    const duration = media.duration
    if (!Number.isFinite(duration) || duration <= 0) return 0
    return Math.min(1, Math.max(0, media.currentTime / duration))
  }

  function sync() {
    const playing = !media.paused && !media.ended
    player.classList.toggle("is-playing", playing)
    toggle.setAttribute("aria-label", playing ? "Pause" : "Play")
    toggle.setAttribute("aria-pressed", playing ? "true" : "false")
    const ratio = currentRatio()
    fill.style.width = ratio * 100 + "%"
    track.setAttribute("aria-valuenow", String(Math.round(ratio * 100)))
    if (time) {
      const duration = Number.isFinite(media.duration) ? media.duration : 0
      const label = formatTime(media.currentTime || 0) + " / " + formatTime(duration)
      time.textContent = label
      track.setAttribute("aria-valuetext", label.replace(" / ", " of "))
    }
  }

  function togglePlayback() {
    if (media.paused || media.ended) {
      const pending = media.play()
      if (pending && typeof pending.catch === "function") pending.catch(() => {})
    } else {
      media.pause()
    }
  }

  function seekTo(clientX) {
    const duration = media.duration
    if (!Number.isFinite(duration) || duration <= 0) return
    const rect = track.getBoundingClientRect()
    if (!rect.width) return
    const next = (clientX - rect.left) / rect.width
    media.currentTime = Math.min(1, Math.max(0, next)) * duration
    sync()
  }

  toggle.addEventListener("click", (event) => {
    event.stopPropagation()
    togglePlayback()
    // A mouse click focuses the button and would keep the video chrome open.
    if (kind === "video" && event.detail > 0) toggle.blur()
  })

  if (kind === "video") {
    media.addEventListener("click", togglePlayback)
  }

  track.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return
    dragging = true
    player.classList.add("is-scrubbing")
    track.setPointerCapture(event.pointerId)
    seekTo(event.clientX)
  })

  track.addEventListener("pointermove", (event) => {
    if (!dragging) return
    seekTo(event.clientX)
  })

  function stopDrag() {
    dragging = false
    player.classList.remove("is-scrubbing")
  }

  track.addEventListener("pointerup", stopDrag)
  track.addEventListener("pointercancel", stopDrag)

  track.addEventListener("keydown", (event) => {
    const duration = media.duration
    if (!Number.isFinite(duration)) return
    const step = event.shiftKey ? 10 : 5
    if (event.key === "ArrowRight") {
      media.currentTime = Math.min(duration, media.currentTime + step)
    } else if (event.key === "ArrowLeft") {
      media.currentTime = Math.max(0, media.currentTime - step)
    } else if (event.key === "Home") {
      media.currentTime = 0
    } else if (event.key === "End") {
      media.currentTime = duration
    } else {
      return
    }
    event.preventDefault()
  })

  track.addEventListener("click", (event) => {
    event.stopPropagation()
  })

  media.addEventListener("play", () => {
    if (kind === "video") player.classList.add("has-played")
    scope.querySelectorAll("audio, video").forEach((other) => {
      if (other !== media && !other.paused) other.pause()
    })
    sync()
  })

  ;["pause", "ended", "timeupdate", "seeked", "loadedmetadata", "durationchange"].forEach(
    (name) => {
      media.addEventListener(name, sync)
    },
  )

  media.addEventListener("error", () => {
    player.classList.add("is-error")
    toggle.disabled = true
    toggle.setAttribute("aria-label", "Unable to play")
  })

  sync()
}

function formatTime(seconds) {
  const total = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const secs = total % 60
  const pad = (value) => String(value).padStart(2, "0")
  if (hours > 0) return hours + ":" + pad(minutes) + ":" + pad(secs)
  return minutes + ":" + pad(secs)
}

window.mountPlayers = mountPlayers
