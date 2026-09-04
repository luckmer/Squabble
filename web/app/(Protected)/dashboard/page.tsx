'use client'

import Dashboard from '@pages/Dashboard'

import { recentGamesSelector } from '@store/recentGames/selector'
import { userSelector } from '@store/user/selector'

import { useEffect, useMemo } from 'react'

const DashboardRoot = () => {
  const user = userSelector.use.user()

  const recentGames = recentGamesSelector.use.recentGames()
  const localRecentGames = recentGamesSelector.use.localRecentGames()

  const isLoading = recentGamesSelector.use.isGamesLoading()
  const isFetched = recentGamesSelector.use.isGamesFetched()
  const isStatsFetched = recentGamesSelector.use.isStatsFetched()

  const isPrevLoading = recentGamesSelector.use.isGamesPrevLoading()
  const isPrevStatsLoading = recentGamesSelector.use.isStatsPrevLoading()

  const fetchRecentGames = recentGamesSelector.use.fetchRecentGames()
  const fetchRecentGamesStats = recentGamesSelector.use.fetchRecentGamesStats()

  const gamesPlayed = recentGamesSelector.use.games_played()
  const solveRate = recentGamesSelector.use.solve_rate()
  const cursor = recentGamesSelector.use.nextCursor()

  useEffect(() => {
    if (!recentGames.length && !isLoading && !isFetched) {
      void fetchRecentGames().catch(() => {})
    }
  }, [fetchRecentGames, recentGames.length, isLoading, isFetched])

  useEffect(() => {
    if (!isStatsFetched) {
      void fetchRecentGamesStats().catch(() => {})
    }
  }, [fetchRecentGamesStats, isStatsFetched])

  const games = useMemo(
    () =>
      Array.from(
        new Map([...localRecentGames, ...recentGames].map((game) => [game.id, game])).values(),
      ),
    [localRecentGames, recentGames],
  )

  return (
    <Dashboard
      user={user}
      recentGames={games}
      gamesPlayed={gamesPlayed}
      solveRate={solveRate}
      isLoading={isPrevLoading}
      isStatsLoading={isPrevStatsLoading}
      isCursor={cursor !== null}
      onClickLoadMore={() => fetchRecentGames(cursor)}
    />
  )
}

export default DashboardRoot
