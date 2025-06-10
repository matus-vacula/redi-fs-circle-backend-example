# Deployment Demo

Deployment is done via a [this github action](.github/workflows/deploy.yml).

Server is located on this domain: [fullstackcircle.org](https://fullstackcircle.org/)

## Nginx

Frontend is served by Nginx HTTP server and this is the configuration for the website:

```nginx
server {
	listen 80 default_server;
	listen [::]:80 default_server;

	# SSL configuration
	listen 443 ssl default_server;
	listen [::]:443 ssl default_server;
	ssl_certificate /etc/ssl/certs/fullstackcircle.org_ssl_certificate.cer;
	ssl_certificate_key /etc/ssl/private/_.fullstackcircle.org_private_key.key;

    # This is where the HTML, JS, CSS and other static assets are located on the server.
	root /var/www/html;

	index index.html index.htm index.nginx-debian.html;

	server_name _;

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		try_files $uri $uri/ =404;
	}

    # All routes which start with "/api" will be proxied to the api which runs on port 4001.
	location /api {
		proxy_pass  http://127.0.0.1:4001;
    }

	expires -1;
}
```

## Supervisor
Supervisor makes sure that backend is always running and automatically restarted in case it crashes. This is the configuration for the backend process:
```ini
[program:api]
command=/root/.nvm/versions/node/v20.18.0/bin/node /var/www/api/index.js
directory=/root
user=root
group=root
autostart=true
autorestart=true
stdout_logfile=/var/log/api/stdout.log
stderr_logfile=/var/log/api/stderr.log
```