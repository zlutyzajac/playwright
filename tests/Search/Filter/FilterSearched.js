Feature('Filter');

Scenario('Filter searched episodes - negative, positive action ', async ({I, Ribbon, SearchPage}) => {

    const URL = 'https://www.stream.cz';
    const EXISTING_VALUE = 'Kazma';
    const EMPTY_FILTER_MESSAGE = 'Zadaným filtrům neodpovídá žádný výsledek.';

    I.startCleanOnPage(URL);
    Ribbon.searchValue(EXISTING_VALUE);
    SearchPage.checkSuccessfulSearchElements(URL, EXISTING_VALUE);

    SearchPage.actionWithFilterNegativeResult();
    I.assertEqual(EMPTY_FILTER_MESSAGE, await SearchPage.getEmptyFilterMessage());

    I.startCleanOnPage(URL);
    Ribbon.searchValue(EXISTING_VALUE);
    SearchPage.checkSuccessfulSearchElements(URL, EXISTING_VALUE);

    SearchPage.actionWithFilterPositiveResult();

});
