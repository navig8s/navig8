install:
	cd backend; pnpm install &
	cd frontend; pnpm install
start:
	make install
	cd backend; pnpm start &
	cd frontend; pnpm dev
build:
	cd frontend && pnpm build
start_in_docker:
	docker run -it --rm -v `pwd`:/navig8 -p 9000:9000 -p 5173:5173 --name navig8_dev_container $$(docker build -q -f ./docker.dev/Dockerfile .)
run_from_inside_docker:
	make install
	cd backend; pnpm start &
	cd frontend; pnpm dev --host
enter_docker_shell:
	docker exec -it navig8_dev_container /bin/bash
