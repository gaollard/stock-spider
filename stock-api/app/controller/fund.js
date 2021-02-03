'use strict';

const Controller = require('egg').Controller;

class FundController extends Controller {
  async index() {
    let ctx = this.ctx;
    let { pageIndex, pageSize, sortField, sortDirection } = ctx.request.query;

    pageIndex = pageIndex ? +pageIndex : 1;
    pageSize = pageSize ? +pageSize : 20;

    const params = {
      offset: pageSize * (pageIndex - 1),
      limit: pageSize,
    }

    if (sortField && sortDirection) {
      params.order = [
        [sortField, sortDirection]
      ]
    }

    let { count, rows } = await ctx.model.Fund.findAndCountAll(params);

    ctx.body = {
      code: 0,
      message: '',
      data: {
        list: rows,
        count: count,
        pageSize,
        pageIndex
      }
    }
  }
}

module.exports = FundController;
