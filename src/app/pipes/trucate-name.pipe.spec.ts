import { TrucateNamePipe } from './trucate-name.pipe';

describe('TrucateNamePipe', () => {
  it('create an instance', () => {
    const pipe = new TrucateNamePipe();
    expect(pipe).toBeTruthy();
  });
});
