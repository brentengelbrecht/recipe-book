import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../services/auth.service";
import { DataStorageService } from "../services/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    isAuthenticated = false;
    
    constructor(private dataStorage: DataStorageService, private authService: AuthService) {}

    ngOnInit() {
        this.subscriptions.push(this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
            console.log(`!user == ${!user}`);
            console.log(`!!user == ${!!user}`);
        }));
    }

    ngOnDestroy() {
        this.subscriptions.map(s => s.unsubscribe());
    }

    onSaveData() {
        this.dataStorage.storeRecipes();
    }

    onFetchData() {
        this.dataStorage.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }
}
