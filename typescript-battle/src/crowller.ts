import superagent from 'superagent';
import fs from 'fs';
import path from 'path';

import YwAnalyzer from './ywAnalyzer';
import Yw2Analyzer from './yw2Analyzer';

export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

export default class Crowller {
  private filePath = path.resolve(__dirname, '../data/child.json');

  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess();
  }

  // 获得html
  private async getRawhtml() {
    const result = await superagent.get(this.url);

    return result.text;
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  private async initSpiderProcess() {
    const html = await this.getRawhtml(); // 获得爬取页面的内容
    const fileContent = this.analyzer.analyze(html, this.filePath); // 分析
    this.writeFile(fileContent); // // 写入文件
  }
}

// const ywAnalyzer = YwAnalyzer.getInstance();
// const crowller = new Crowller(url, ywAnalyzer);
