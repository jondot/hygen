# 

Steps to reproduce 
```
hygen app docker_compose:add_app_db_migration --project_path ./target_file
```

Actual output:
```
diff --git a/target_file/docker-compose.yml b/target_file/docker-compose.yml
index 17173ea..f6fb3c1 100644
--- a/target_file/docker-compose.yml
+++ b/target_file/docker-compose.yml
@@ -2,6 +2,9 @@ version: "3.5"

 services:
   my-app: # auto-generated
+first_line
+last_line
+
     image: "my-image"
     container_name: container-name
     environment:
```


Expected output:
```
diff --git a/target_file/docker-compose.yml b/target_file/docker-compose.yml
index 17173ea..2ddcbc2 100644
--- a/target_file/docker-compose.yml
+++ b/target_file/docker-compose.yml
@@ -1,6 +1,9 @@
 version: "3.5"

 services:
+first_line
+last_line
+
   my-app: # auto-generated
     image: "my-image"
     container_name: container-name
```
