const chalk = require("chalk");
const ora = require("ora");
const open = require("open");
const inquirer = require("inquirer");

const compressing = require("compressing");
const Client = require("ssh2").Client;
const signale = require("signale");
const shell = require("shelljs");

const spinner = ora({
  text: "connecting sever...",
  color: "cyan"
});

const params = {
  build: false,
  version: ""
};

// SSH 连接配置
const server = {
  host: "39.108.138.156",
  port: 22,
  username: "root",
  password: ""
};

// 代码推送地址配置
const config = {
  sourcePath: "dist",
  remotePath: "/data/temp"
};

const connect = new Client();

// 连接服务器
function conn(callback) {
  connect.on("ready", () => {
    spinner.succeed();
    callback && callback();
  });

  connect.on("error", err => {
    console.error(err);
    process.exit(1);
  });

  connect.on("end", () => {
    console.log(chalk.cyan("connect end.\n"));
  });

  connect.on("close", err => {
    if (err) {
      console.log(err);
      console.log(chalk.red("connect closed.\n"));
    }
  });

  spinner.start("connect server...");
  connect.connect(server);
}

// 文件上传
function upload() {
  spinner.start("upload file...\n");
  connect.sftp((err, sftp) => {
    if (err) throw err;
    sftp.fastPut(
      `${config.sourcePath}.zip`,
      `${config.remotePath}/${config.sourcePath}.zip`,
      (err, res) => {
        if (err) {
          console.log(err);
          spinner.fail("upload failed");
          connect.end();
          return;
        }
        spinner.succeed();
        unzipShell();
      }
    );
  });
}

// 服务器解压命令
function unzipShell() {
  spinner.start("unzip...");
  connect.shell((err, stream) => {
    if (err) throw err;
    let buf = "";
    stream.on("close", err => {
      if (err) {
        console.error(err);
        return;
      }
      spinner.succeed();
      connect.end();
      open("https://www.baidu.com", "chrome");
    });

    stream.on("data", data => {
      buf += data;
      /**
       * TODO 这里有一个问题是打印的日志比较乱, 不是顺序打印的
       * 需要优化逻辑, 暂时没想到办法, 先注释代码
       */
      console.log(data.toString());
    });

    stream.write(
      `cd ${config.remotePath} && unzip -o ${config.sourcePath}.zip \n`
    );
    stream.write(`cd ${config.sourcePath} && /bin/cp -r -f * ../ \n`);
    stream.write(`cd ../ && rm -rf ${config.sourcePath} \n`);
    stream.write(`rm -f ${config.sourcePath}.zip \n`);
    stream.write(`exit\n`);
  });
}

// 文件压缩
function compress() {
  spinner.start("compress file...");
  compressing.zip
    .compressDir(`${config.sourcePath}`, `${config.sourcePath}.zip`)
    .then(() => {
      spinner.succeed();
      conn(upload);
    });
}

// 代码打包
function compile(cb) {
  const tasks = ["npm run build"];
  tasks.forEach(task => {
    signale.start(task);
    const interactive = new signale.Signale({
      interactive: true
    });
    interactive.pending(task);
    shell.exec(`${task} --silent`);
    interactive.success(task);
  });
  cb && cb();
}

const options = [
  {
    type: "input",
    name: "password",
    message: "SSH登录密码",
    validate: val => !!val.length
  },
  {
    type: "confirm",
    name: "build",
    message: "是否编译",
    default: false
  }
];

function bootstrap() {
  if (params.build) {
    compile(() => {
      compress();
    });
  } else {
    compress();
  }
}

inquirer
  .prompt(options)
  .then(res => {
    Object.assign(params, res);
    server.password = res.password;
    bootstrap();
  })
  .catch(err => {
    console.log(err);
  });
