import { BasicTestingComponent } from './basic-testing.component';
describe('BasicTestingComponent', () => {
  let fixture: BasicTestingComponent;
  beforeEach(() => {
    fixture = new BasicTestingComponent();
  });

  it('should be a little signal-project', () => {
    expect(fixture.title).toEqual('test');
  });
  it('should create', () => {
    expect(fixture).toBeTruthy();
  });
});
