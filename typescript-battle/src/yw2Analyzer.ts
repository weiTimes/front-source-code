import { Analyzer } from './crowller';

export default class Yw2Analyzer implements Analyzer {
  analyze(html: string, filePath: string) {
    return html;
  }
}
