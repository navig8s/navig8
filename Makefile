install:
	cd backend; pnpm install &
	cd frontend; pnpm install
start:
	make install
	cd backend; pnpm start &
	cd frontend; pnpm dev
