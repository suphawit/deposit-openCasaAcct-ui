initial     

#Kubernetes 
 : ingress path : /EAPP/eapp_front/e-application/
 
#Change index.html
 
 base_href = "/EAPP/eapp_front/e-application/"
 
#Change Dockerfile 

 copy step copy file @ dist to  /usr/share/nginx/html/EAPP/eapp_front/e-application/
 
#Change /nginx/default.conf

    #Mapping default path 
    location / {
        root   /usr/share/nginx/html/EAPP/eapp_front;
        index  index.html index.htm;
    }
    
    #Setup proxy 
    location  /EAPP/eapp_front/e-application/EAPP/eapp_service/ {
          rewrite /EAPP/eapp_front/e-application/EAPP/eapp_service/(.*) /EAPP/eapp_service/$1 break;
          proxy_pass http://10.3.105.72;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
