module IssuesHelper
	def twitter_puller
		@rep_twitter = Twitter.user_timeline(@rep.twitter_handle)
		if @rep_twitter.length > 10
			@rep_twitter = @rep_twitter[-10..-1]
		end
	end
end
