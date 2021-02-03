const Service = require('egg').Service

class FundService extends Service {
  async create({
    uid,
    projectId
  }) {
    let res = await this.app.mysql.insert('enroll', {
      user_id: uid,
      project_id: projectId
    })
    if (res.affectedRows === 1) {
      return {
        retCode: 0,
        errCode: 0,
        errMsg: ''
      }
    } else {
      return {
        retCode: 1,
        errCode: 1,
        errMsg: '报名失败'
      }
    }
  }

  // 项目报名列表
  async list() {
    // 报名列表
    let list = await this.app.mysql.select('enroll', {
      where: {
        project_id: projectId
      }
    });

    return {
      retCode: 0,
      errCode: 0,
      errMsg: '',
      data: {
        list: list
      }
    };
  }

  // 获取用户列表
  async _getUserList({
    userIdList
  }) {
    return this.app.mysql.select('user', {
      where: {
        id: userIdList
      }
    });
  }

  // 获取项目列表
  async _getProjectList(projectList) {
    return this.app.mysql.select('demand', {
      where: {
        id: projectList
      }
    });
  }

  // 判断用户是否报名
  async getEnrollStatus({
    uid,
    projectId
  }) {
    const list = await this.app.mysql.select('enroll', {
      where: {
        user_id: uid,
        project_id: projectId
      }
    });
    return {
      errMsg: '',
      errCode: 0,
      retCode: 0,
      data: {
        status: list.length >= 1 ? 1 : 0
      }
    }
  }

  async getUserEnrollList({
    uid,
    pageSiz,
    pageIndex
  }) {
    const list = await this.app.mysql.select('enroll', {
      where: {
        user_id: uid
      }
    });

    const projectIdList = list.map(element => {
      return element.project_id
    });

    if (projectIdList.length) {
      const projectList = await this._getProjectList(projectIdList)
      list.forEach((element) => {
        projectList.forEach(project => {
          if (element.project_id === project.id) {
            element.projectInfo = project
          }
        })
      })
    }
    return {
      errMsg: '',
      errCode: 0,
      retCode: 0,
      data: {
        list: list
      }
    }
  }
}

module.exports = FundService
