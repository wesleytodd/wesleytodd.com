sass:
	@sass --watch scss/main.scss:css/style.css --style expanded >> sass.log 2>&1 &

sass-production:
	@sass --watch scss/main.scss:css/style.css --style compressed >> sass.log 2>&1 &

sass-final:
	@sass --style compressed scss/main.scss css/style.css

sass-stop:
	@pkill -x sass

.PHONY: sass, sass-production, sass-final, sass-stop
