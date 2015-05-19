UPDIR=$$(dirname $$PWD)

links: node_modules

node_modules: node_modules/docvy-utils

node_modules/docvy-utils:
	ln -sf ${UPDIR}/utils $@


.PHONY: links
