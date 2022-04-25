Feature('Search');

Scenario('Search on first page - existing value, next episodes loading',
    async ({I, Ribbon, SearchPage}) => {

        const MAIN_URL = 'https://www.stream.cz';
        const URL = 'https://www.stream.cz/videa/zabava';
        const EXISTING_VALUE = 'Kazma';

        I.startCleanOnPage(URL);
        Ribbon.searchValue(EXISTING_VALUE);
        SearchPage.checkSuccessfulSearchElements(MAIN_URL, EXISTING_VALUE);

        const searchResultNumberEpisodes = await I.usePlaywrightTo("countElements", async ({page}) => {
            return page.$$('//*[@id="app"]/div/div/div[2]/div/div[1]/div/div[2]/section/ul/li[1]');
        });
        I.assertEqual(searchResultNumberEpisodes.length, 100); // cannot locate corresponding element

        I.scrollPageToBottom();
        I.click(SearchPage.locators.searchSuccessful.loadNextEpisodesButton);

        const nextSearchResultNumberEpisodes = await I.usePlaywrightTo("countElements", async ({page}) => {
            return page.$$('//*[@id="app"]/div/div/div[2]/div/div[1]/div/div[2]/section/ul/li[1]');
        });
        I.assertEqual(nextSearchResultNumberEpisodes.length, 100);

    });
