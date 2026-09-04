export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return mins ? `${mins}m ${secs.toString().padStart(2, '0')}s` : `${secs}s`
}

export const formatRelativeTime = (date: string | number | Date): string => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)

  if (seconds < 60) return `${seconds}s ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)}w ago`
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo ago`

  return `${Math.floor(seconds / 31536000)}y ago`
}

export const formatGameTime = (duration: number, playedAt: string | number | Date) =>
  `${formatDuration(duration)} · ${formatRelativeTime(playedAt)}`
