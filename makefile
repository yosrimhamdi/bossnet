
update-client:
	cd client && npm run build
	pm2 restart bossnet-client

update-server:
	pm2 restart bossnet-server

update-both:
	$(MAKE) update-server
	$(MAKE) update-client

	

