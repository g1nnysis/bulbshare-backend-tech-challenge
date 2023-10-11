import { PollItem } from '../../../entities/poll_item.entity'

export function calculateAverageCompletionTime(pollItems: PollItem[]): number {
  const userTimeMap = new Map<number, number>()

  pollItems.forEach(pollItem => {
    pollItem.pollResponses.forEach(response => {
      const timeSpent = response.end_time.getTime() - response.start_time.getTime()
      const userId = response.user_id

      if (userTimeMap.has(userId)) {
        userTimeMap.set(userId, userTimeMap.get(userId) + timeSpent)
      } else {
        userTimeMap.set(userId, timeSpent)
      }
    })
  })

  const totalUsers = userTimeMap.size
  const totalSpentTime = Array.from(userTimeMap.values()).reduce((acc, time) => acc + time, 0)

  const averageTimeSpent = totalUsers > 0 ? totalSpentTime / totalUsers : 0
  return averageTimeSpent
}
