# 使用基础镜像 JDK21
FROM azul/zulu-openjdk:21
LABEL maintainer="itps.tian"

# 设置工作目录
WORKDIR /app

# 设置语言和时区
ENV LANG="C.UTF-8"
ENV TZ="Asia/Shanghai"
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 更新 apt 源并安装常用工具
RUN sed -i "s/archive.ubuntu.com/mirrors.aliyun.com/g" /etc/apt/sources.list \
    && sed -i "s/security.ubuntu.com/mirrors.aliyun.com/g" /etc/apt/sources.list \
    && apt update \
    && apt -y install vim curl net-tools iputils-ping \
    && rm -rf /var/lib/apt/lists/*

# 拷贝本地构建好的 jar 包到容器中
COPY student-management-system-0.0.1-SNAPSHOT.jar app.jar

# 可选：如果有额外配置文件（如 FlowRule.json）
# COPY target/classes/FlowRule.json FlowRule.json

# 暴露端口
EXPOSE 9988

# 设置 JVM 启动参数（可根据项目内存调整）
ENV JAVA_OPTS="-Xms256m -Xmx512m -Dspring.profiles.active=prod"

# 启动命令
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]