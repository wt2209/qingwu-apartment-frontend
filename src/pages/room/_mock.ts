// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { parse } from 'url';
import { RoomListItem, RoomListParams } from './data.d';

// mock tableListDataSource
let tableListDataSource: RoomListItem[] = [
  { id: 1, title: '1-1-101', building: '1#', unit: '1单元', rent: 0, number: 1 },
  { id: 2, title: '1-1-102', building: '1#', unit: '1单元', rent: 0, number: 1 },
  { id: 3, title: '1-2-101', building: '1#', unit: '2单元', rent: 0, number: 1 },
  { id: 4, title: '1-2-102', building: '1#', unit: '2单元', rent: 0, number: 1 },
  { id: 5, title: '2-1-101', building: '2#', unit: '1单元', rent: 0, number: 1 },
  { id: 6, title: '2-1-102', building: '2#', unit: '1单元', rent: 0, number: 1 },
];


function getRoom(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = (parse(url, true).query as unknown) as RoomListParams;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }


  if (params.title) {
    dataSource = dataSource.filter(data => data.title.includes(params.title || ''));
  }

  if (params.building) {
    dataSource = dataSource.filter(data => data.building.includes(params.building || ''));
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = parseInt(`${params.pageSize}`, 0);
  }

  const result = {
    data: dataSource,
    total: dataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.page}`, 10) || 1,
  };

  return res.json(result);
}

function postRoom(req: Request, res: Response, u: string, b: Request) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.id) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        id: i,
        title: '高1-301',
        building: '高1',
        unit: '3-7层',
        rent: 600,
        number: 4,
        updatedAt: new Date(),
        createdAt: new Date(),
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.id === key) {
          return { ...item, desc, name };
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  return res.json(result);
}

export default {
  'GET /api/rooms': getRoom,
  'POST /api/room': postRoom,
};
