install:
	cd backend; \
	pnpm install &
	cd frontend; \
	pnpm install
start:
	cd backend; \
	pnpm start &
	cd frontend; \
	pnpm dev
build:
	cd frontend && pnpm build
