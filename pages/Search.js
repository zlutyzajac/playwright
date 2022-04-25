const {I, Ribbon} = inject();

class Search {
    locators = {
        searchSuccessful: {
            topSearchResult: '$top_search_result',
            showsResults: '$search_shows',
            episodesResults: '$search_episodes',
            filterEpisodes: {
                openSearchFilterButton: '$search-filter-episodes/toggle-btn/show',
                searchFilter: {
                    filterSection: '$search-filter-episodes',
                    publishedSection: {
                        today: '$today'
                    },
                    durationSection: {
                        short: '$under_10_minutes'
                    },
                    orderSection: {
                        newest: '$newest',
                        mostWatched: '$most_watched'
                    }
                },
                // filteredEpisodesList: '//*[@id="app"]/div/div/div[2]/div/div[1]/div/div[2]/section/ul',
                firstEpisode: '$1',
                emptyResultMessage: '//*[@id="app"]/div/div/div[2]/div/div[1]/div/div[2]/section/h2[2]'
            },
            loadNextEpisodesButton: '$next_episodes'
        },
        searchUnsuccessful: {
            emptyResultMessage: '//*[@id="app"]/div/div/div[2]/div/div[1]/div',
            fillSearchInputMessage: '//*[@id="app"]/div/div/div[2]/div/div[1]/div'
        }
    }

    getEmptyResultMessage() {
        return I.grabTextFrom(this.locators.searchUnsuccessful.emptyResultMessage);
    }

    getFillSearchInputMessage() {
        return I.grabTextFrom(this.locators.searchUnsuccessful.fillSearchInputMessage);
    }

    async attemptSearchNonExistingValues(nonExistingValue) {
        Ribbon.searchValue(nonExistingValue);
        I.click(Ribbon.locators.center.searchButton);
        I.waitForVisible(this.locators.searchUnsuccessful.emptyResultMessage, 15);
        return this.getEmptyResultMessage();
    }

    checkSuccessfulSearchElements(url, existingValue) {
        I.waitForVisible(this.locators.searchSuccessful.topSearchResult, 10);
        I.seeElement(this.locators.searchSuccessful.showsResults);
        I.seeElement(this.locators.searchSuccessful.episodesResults);
        I.seeInCurrentUrl(url + '/hledani?dotaz=' + existingValue);
    }

    openFilterSection() {
        I.click(this.locators.searchSuccessful.filterEpisodes.openSearchFilterButton);
        I.seeElement(this.locators.searchSuccessful.filterEpisodes.searchFilter.filterSection);
    }

    filterPublishedTodayEpisodes() {
        I.click(this.locators.searchSuccessful.filterEpisodes.searchFilter.publishedSection.today);
    }

    filterDurationShortEpisodes() {
        I.click(this.locators.searchSuccessful.filterEpisodes.searchFilter.durationSection.short);
    }

    filterOrderNewestEpisodes() {
        I.click(this.locators.searchSuccessful.filterEpisodes.searchFilter.orderSection.newest);
    }

    filterOrderMostWatchedEpisodes() {
        I.click(this.locators.searchSuccessful.filterEpisodes.searchFilter.orderSection.mostWatched);
    }

    async getEmptyFilterMessage() {
        return I.grabTextFrom(this.locators.searchSuccessful.filterEpisodes.emptyResultMessage);
    }

    actionWithFilterNegativeResult() {
        this.openFilterSection();
        this.filterPublishedTodayEpisodes();
        this.filterDurationShortEpisodes();
        this.filterOrderNewestEpisodes();
        I.waitForVisible(this.locators.searchSuccessful.filterEpisodes.emptyResultMessage, 5);
    }

    actionWithFilterPositiveResult() {
        this.openFilterSection();
        this.filterOrderMostWatchedEpisodes();
        I.seeElement(this.locators.searchSuccessful.filterEpisodes.firstEpisode);
    }
}

module.exports = new Search();
