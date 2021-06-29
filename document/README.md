# Git
```
git checkout <branch-name>
git clone -b dev https://github.com/ndson22/Project_Job_Portal_Artisan.git
git fetch origin dev:dev
```
```
git init -b <branch-name>
git add .
git commit -m "First commit"
git remote add origin https://github.com/ndson22/Project_Job_Portal_Artisan.git
git remote -v
git push origin main <branch-name>
```

# Angular
```
npm install

Tạo component: ng g c frontend/<component-group>/<specific-component-name>
Tạo service: ng g s shared/services/<service-name>
Tạo model: ng g class shared/models/<model-name>
```
Installed packages:
+ https://www.npmjs.com/package/ngx-toastr
+ https://www.npmjs.com/package/@ng-bootstrap/ng-bootstrap
+ https://www.npmjs.com/package/ngx-validators
+ https://www.npmjs.com/package/ngx-timeago

# Laravel
```
composer install
copy .env.example .env \\ Database nen dat ten la codegym_jobportal
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan hcvn:install
```
Installed packages:
+ https://github.com/vanthao03596/laravel-hanhchinhvn
