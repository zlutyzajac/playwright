Feature('Search');

Scenario('Search on main page - non-existing, existing value', async ({I, Ribbon, SearchPage}) => {

    const URL = 'https://www.stream.cz';
    const NON_EXISTING_VALUE_FIRST = 'abcdsuperbullshit42';
    const NON_EXISTING_VALUE_SECOND = '@@@test@#$';
    const EMPTY_RESULT_MESSAGE = 'Bohužel jsme nic nenašli.';
    const EXISTING_VALUE = 'Kazma';

    I.startCleanOnPage(URL);
    // for (const nonExistingValues of [NON_EXISTING_VALUE_FIRST, NON_EXISTING_VALUE_SECOND]) {
    //     I.assertEqual(EMPTY_RESULT_MESSAGE, await SearchPage.attemptSearchNonExistingValues(nonExistingValues));
    //     Ribbon.clearSearchField();
    // }

    Ribbon.searchValue(NON_EXISTING_VALUE_FIRST);
    I.waitForVisible(SearchPage.locators.searchUnsuccessful.emptyResultMessage, 15);
    const emptyResultMessage = await SearchPage.getEmptyResultMessage(); // flaky test on 'emptyResultMessage' XPath
    I.assertEqual(EMPTY_RESULT_MESSAGE, emptyResultMessage);
    I.seeInCurrentUrl(URL + '/hledani?dotaz=' + NON_EXISTING_VALUE_FIRST);

    I.startCleanOnPage(URL);
    Ribbon.searchValue(EXISTING_VALUE);
    SearchPage.checkSuccessfulSearchElements(URL, EXISTING_VALUE);

});
