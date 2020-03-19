最近开始使用 angular 做项目，写这篇文章目的是记录 angular 基本的使用，方便快速上手，也是为了防止与其他两个框架混淆。

# 脚手架命令

```
// 安装脚手架
npm install -g @angular/cli

// 创建项目
ng new myApp

// 启动项目
ng serve --open

// 创建自定义组件
ng generate component my-new-component

// 创建服务
ng generate service my-new-service

// 创建路由守卫
ng generate guard my-new-guard

// 创建自定义指令
ng generate directive my-new-directive
```

# 生命周期

生命周期的顺序

```
ngOnChanges

当有父组件传值给子组件，数据发生改变时，子组件会触发该生命周期

ngOnInit

初始化完成组件后，调用该钩子

ngDoCheck

变更检测，在发生 Angular 无法自己检测的变化时作出反应。

ngAfterContentInit

当 Angular 把外部内容投影进组件/指令的视图之后调用

ngAfterContentChecked

每当 Angular 完成被投影组件内容的变更检测之后调用。

ngAfterViewInit

初始化完组件视图及其子视图之后调用

ngAfterViewChecked

每当 Angular 做完组件视图和子视图的变更检测之后调用。

ngOnDestroy

销毁组件时调用
```

# 模板语法

## 数据文本绑定

```
{{title}}
```

## 绑定 HTML

```
<div [innerHTML]="h"></div>
```

## 数据循环

```
<ul>
 <li *ngFor="let item of list;let i = index;">
  {{item}}
 </li>
</ul>
```

## 管道

管道（pipe）是用来对输入的数据进行处理，如大小写转换、数值和日期格式化等。

```
<p>{{today | date:'yyyy-MM-dd HH:mm:ss' }}</p>

today: any = new Date()
```

## switch 判断

```
<ul [ngSwitch]="title">
    <li *ngSwitchCase="1">1</li>
    <li *ngSwitchCase="2">2</li>
    <li *ngSwitchDefault>3</li>
</ul>
```

## 条件判断

```
<p *ngIf="list.length > 3">这是 ngIF 判断是否显示</p>
```

## 事件绑定

```
<button class="button" (click)="getData()">
 点击按钮触发事件
</button>
```

## 属性绑定

```
<div [id]="id" [title]="msg">调试工具看看我的属性</div>
```

## class 绑定

```
<p [ngClass]="{'red':isTrue}">red</p>

<p [class.red]="isTrue">red</p>
```

## style 绑定

```
<p [ngStyle]="{'background-color':color}">red</p>
```

## 双向绑定

```
<input [(ngModel)]="inputValue">

注意在 app.module.ts 引入 FormsModule
import { FormsModule } from '@angular/forms';

@NgModule({
 declarations: [
     AppComponent
 ],
 imports: [
     BrowserModule,
     FormsModule
 ],
 providers: [],
 bootstrap: [AppComponent]
})

export class AppModule { }
```

# 创建服务

服务可用来封装一些共用的逻辑，也能做状态管理。通过 ng g service storage 创建 storage 文件

在 app.module.ts 里面引入创建的服务

```
import { StorageService } from './services/storage.service';

@NgModule({
 declarations: [
    ...
 ],
 imports: [
    ...
 ],
 providers: [ StorageService ],
 bootstrap: [ ... ]
})
export class AppModule { }
```

修改 storage.service.ts

```
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public name: string = 'ghc'

  constructor() { }

}
```

在使用的页面注册服务

```
import { StorageService } from '../../services/storage.service';
constructor(private storage: StorageService) {}

ngOnInit() {
    console.log(this.storage.name)
}
```

# HttpClient

HttpClient 是 angular 自带的 http 模块

```
1、在 app.module.ts 引入 http 模块

import { HttpClientModule } from '@angular/common/http';

2、HttpClientModule 依赖注入

@NgModule({
 declarations: [ ... ],
imports: [
    HttpClientModule
],
providers: [ ... ],
bootstrap: [ ... ]
})

export class AppModule { }
```

## get

```
1、在需要请求数据的地方引入 HttpClient

    import { HttpClient } from "@angular/common/http";

2、构造函数内声明：

    constructor(private http: HttpClient) { }

3、在对应方法里使用 http：

    this.http.get(url, { params: {} }).subscribe(function(data){
        console.log(data);
    },function(err){
        console.log(err);
    });
```

## delete

```
1、在需要请求数据的地方引入 HttpClient

    import { HttpClient } from "@angular/common/http";

2、构造函数内声明：

    constructor(private http: HttpClient) { }

3、在对应方法里使用 http：

    this.http.delete(url, { params: {} }).subscribe(function(data){
        console.log(data);
    },function(err){
        console.log(err);
    });
```

## post

```
1、引入 Headers 、Http 模块

    import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

2、实例化 Headers

    public httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    public httpForm = { 
        headers: new HttpHeaders(
            { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        ) 
    };

3、post 提交数据

    // json 格式传参
    this.http.post(api, { username:'张三', age:'20' }, this.httpOptions)
    .subscribe(response => {
        console.log(response);
    });

    // 序列化参数
    const params = new HttpParams({
      fromObject: query // 传入的参数对象
    })

    this.http.post(api, params, this.httpForm).subscribe(response => {
        console.log(response);
    });
```

## put

```
1、引入 Headers 、Http 模块

    import { HttpClient, HttpHeaders } from "@angular/common/http";

2、实例化 Headers

    public httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

3、put 提交数据

    this.http.put(api, { }, this.httpOptions).subscribe(response => {
        console.log(response);
    });
```

## 拦截器

创建 interceptor.service.ts 文件

```
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
    intercept(req: any, next: HttpHandler):
        Observable<HttpEvent<any>> {
        // 请求发出前执行
        console.log(req)
        return next.handle(req).pipe(
            tap(
                event => {
                    // 请求返回成功
                    if (event instanceof HttpResponse) {
                        console.log(event)
                    }
                },
                error => {
                    // 请求返回失败
                    console.log(error)
                }
            ),
            finalize(() => {
                // 不论成功还是失败都会执行
            })
        );
    }
}
```

在 app.module.ts 中引入

```
import { NoopInterceptor } from "./interceptor/interceptor.service"

@NgModule({
 declarations: [
    ...
 ],
 imports: [
    ...
 ],
 providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true }
 ],
 bootstrap: [
    ...
 ]
})

export class AppModule { }
```



# 父子组件传值@Input @Output @ViewChild





## @Input



```
1\. 父组件调用子组件的时候传入数据

<app-header [msg]="msg"></app-header>

2\. 子组件引入 Input 模块

import { Component, OnInit ,Input } from '@angular/core';

3\. 子组件中 @Input 接收父组件传过来的数据

export class HeaderComponent implements OnInit {
 @Input() msg:string
 constructor() { }
 ngOnInit() {}
}
```



## @Output



```
1、父组件监听子组件派发的事件

<app-title text="编辑科室信息" (closeOut)="fn()"></app-title>

2、子组件引入 Output, EventEmitter模块

import { Component, OnInit , Output, EventEmitter } from '@angular/core';

3、子组件中实例化一个自定义事件

export class TitleComponent implements OnInit {

  @Output() closeOut = new EventEmitter();

  close() {
    this.closeOut.emit()
  }
}
```



## @ViewChild



可用来获取 dom 节点或者组件，类似 vue 的 ref 。

```
<app-footer #footerChild></app-footer>

import { OnInit, ViewChild } from '@angular/core';

export class HomeComponent implements OnInit {

  @ViewChild("footerChild") footer

  constructor() {
    console.log(this.footer.username)
  }

}
```

# 路由

## 1、在查询参数中传值

```
<a routerLink="/news" [queryParams]="{ id: 1 }">跳转</a>

import { ActivatedRoute } from '@angular/router';

constructor(private router: ActivatedRoute) { 
    this.router.queryParams.subscribe((v) => {
      console.log(v)
    })
}
```

## 2、在路由路径中传值

```
<a [routerLink]="['/map', 1]">跳转</a>

import { ActivatedRoute } from '@angular/router';

constructor(private router: ActivatedRoute) { 
    this.router.params.subscribe((v) => {
      console.log(v)
    })
}
```

## 3、在路由配置中传值

```
<a routerLink="/info">跳转</a>

{
    path: 'info',
    component: InfoComponent,
    data: [{ id: 2 }]
}

import { ActivatedRoute } from '@angular/router';

constructor(private router: ActivatedRoute) { 
    this.router.snapshot.data[0]["id"]
}
```

编程式写法

```
import { Router } from '@angular/router';

this.router.navigate(["url"], { queryParams: { id: 1 } });
```

## 路由守卫

通过命令行工具创建 auth 文件

```
ng generate guard auth/auth
```

auth

```
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log('AuthGuard#canActivate called');
    return true;
  }
}
```

修改 routing.module.ts，在需要拦截的路由中添加 canActivate 属性

```
import { AuthGuard } from '../auth/auth.guard';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
        {
        path: '',
            children: [
                { path: 'crises', component: ManageCrisesComponent },
                { path: 'heroes', component: ManageHeroesComponent },
                { path: '', component: AdminDashboardComponent }
            ]
        }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
```

# 自定义修饰符

这里创建一个 click.stop 的自定义指令，功能和 vue 的 @click.stop 修饰符是一样的，阻止点击冒泡。

在命令行中通过 ng generate directive name 命令生成 directive 文件

```
import { Directive, Output, EventEmitter, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[click.stop]'
})
export class ClickStopDirective {

  @Output("click.stop") stopPropEvent = new EventEmitter();
  unsubscribe: () => void;

  constructor(
    private renderer?: Renderer2,
    private element?: ElementRef) {
  }

  ngOnInit() {
    this.unsubscribe = this.renderer.listen(
      this.element.nativeElement, 'click', event => {
        event.stopPropagation();
        this.stopPropEvent.emit(event);
      });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
```

在 app.module.ts 中引入

```
import { ClickStopDirective } from './directive/click-stop.directive';

@NgModule({
 declarations: [
    ...
    ClickStopDirective,
    ...
],
imports: [
    ...
],
providers: [
    ...
],
bootstrap: [
    ...
]
})

export class AppModule { }
```

最后在组件之中使用

```

<div (click)="fn()">
  <p (click.stop)="fn1()">阻止冒泡</p>
</div>

``
