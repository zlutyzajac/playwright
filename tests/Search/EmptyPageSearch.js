Feature('Search');

Scenario('Search on empty page - message, search existing value',
    async ({I, SearchPage, Ribbon}) => {

        const URL = 'https://www.stream.cz/hledani';
        const FILL_SEARCH_INPUT_MESSAGE = 'Zadejte, co chcete hledat';
        const EXISTING_VALUE = 'Kazma';
        const MAIN_URL = 'https://www.stream.cz';

        I.startCleanOnPage(URL);
        I.waitForVisible(SearchPage.locators.searchUnsuccessful.fillSearchInputMessage);
        const fillSearchInputMessage = await SearchPage.getFillSearchInputMessage();
        I.assertEqual(FILL_SEARCH_INPUT_MESSAGE, fillSearchInputMessage);

        Ribbon.searchValue(EXISTING_VALUE);
        SearchPage.checkSuccessfulSearchElements(MAIN_URL, EXISTING_VALUE);

    });
