VERTCOIN_DASHBOARD_LOCATION=/var/www/vertcoin-dashboard.com
INSTALL_LOC_DEV=/home/checkout/vertcoin-dash/
INSTALL_LOC=/home/vertcoin-dashboard/vertcoin-dash/
BUILD=live
dev:
	@cd $(INSTALL_LOC_DEV); \
		npm install; \
		grunt dev --build=dev
	@rm -rf $(VERTCOIN_DASHBOARD_LOCATION)
	@mkdir -p $(VERTCOIN_DASHBOARD_LOCATION)
	@cd $(INSTALL_LOC_DEV); \
		rsync -qavI --exclude 'public/assets/tpl' --exclude 'public/assets/less' --exclude 'public/js' ./public $(VERTCOIN_DASHBOARD_LOCATION)

live:
	@cd $(INSTALL_LOC); \
		npm install; \
		grunt live --build=$(BUILD)
	@rm -rf $(VERTCOIN_DASHBOARD_LOCATION)
	@mkdir -p $(VERTCOIN_DASHBOARD_LOCATION)
	@cd $(INSTALL_LOC); \
		rsync -qavI --exclude 'public/assets/tpl' --exclude 'public/assets/less' --exclude 'public/js' ./public $(VERTCOIN_DASHBOARD_LOCATION)