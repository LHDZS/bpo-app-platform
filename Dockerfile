# 核心代码，仅供参考
FROM tomcat

RUN rm -rf /usr/local/tomcat/webapps/*
COPY dist/   /usr/local/tomcat/webapps/ROOT
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
