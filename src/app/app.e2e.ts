import { browser, by, element } from 'protractor';

describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });


  // it('should have <home>', () => {
  //   let subject = element(by.css('app home')).isPresent();
  //   let result  = true;
  //   expect(subject).toEqual(result);
  // });

  // it('should have buttons', () => {
  //   let subject = element(by.css('button')).getText();
  //   let result  = 'Submit Value';
  //   expect(subject).toEqual(result);
  // });

});
