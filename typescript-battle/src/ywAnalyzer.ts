import fs from 'fs';
import cheerio from 'cheerio';

import { Analyzer } from './crowller';

interface Child {
  desc: string;
}

interface ChildResult {
  time: number;
  data: Child[];
}

interface JsonData {
  [propName: number]: Child[];
}

// 实现了Analyzer接口，即YwAnalyzer需要实现analyze方法；其它实现它的接口也是一样
export default class YwAnalyzer implements Analyzer {
  private static instance: YwAnalyzer;

  static getInstance() {
    if (!YwAnalyzer.instance) {
      YwAnalyzer.instance = new YwAnalyzer();
    }

    return YwAnalyzer.instance;
  }

  // 不能被外部实例化
  private constructor() {}

  // 获得分析到的结果数据
  private getChildInfo(html: string) {
    const $ = cheerio.load(html);
    const childs = $('.panel-item');
    let infos: Child[] = [];

    childs.map((index, child) => {
      const desc = $(child).find('.panel-item__desc').text();

      infos.push({ desc });
    });

    const result = {
      time: new Date().getTime(),
      data: infos,
    };

    return result;
  }

  // 生成json
  generateJsonContent(childResult: ChildResult, filePath: string) {
    let fileContent: JsonData = {};

    // 判断文件是否存在
    if (fs.existsSync(filePath)) {
      // 从文件中读取json
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    // 新的数据加进去
    fileContent[childResult.time] = childResult.data;

    return fileContent;
  }

  public analyze(html: string, filePath: string) {
    const result = this.getChildInfo(html); // 分析页面，获得组装好的数据
    const fileContent = this.generateJsonContent(result, filePath); //  将组装好的数据按照json文件的格式进行再次组装

    return JSON.stringify(fileContent);
  }
}
