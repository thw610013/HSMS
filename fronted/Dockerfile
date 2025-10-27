# 使用官方 Nginx 镜像
FROM nginx:alpine

# 设置工作目录
WORKDIR /usr/share/nginx/html

# 拷贝本地打包好的 dist 到 Nginx 默认目录
COPY dist/ /usr/share/nginx/html/

# 拷贝自定义 Nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 8100

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]