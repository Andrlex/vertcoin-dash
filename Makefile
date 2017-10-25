VERTCOIN_DASHBOARD_LOCATION=/var/www/vertcoin-dashboard.com
INSTALL_LOC=/home/checkout/vertcoin-dash/

default:
	@cd $(INSTALL_LOC); \
		npm install; \
		grunt
	@rm -rf $(VERTCOIN_DASHBOARD_LOCATION)
	@mkdir -p $(VERTCOIN_DASHBOARD_LOCATION)
	@cd $(INSTALL_LOC); \
		rsync -qavI --exclude 'public/assets/tpl' --exclude 'public/assets/less' --exclude 'public/src' ./public $(VERTCOIN_DASHBOARD_LOCATION)
