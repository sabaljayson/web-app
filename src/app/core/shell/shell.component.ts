import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProgressBarService } from '../progress-bar.service';

@Component({
  selector: 'mifosx-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  sidenavCollapsed = false;
  progressBarMode: string;
  progressBar$: any;

  constructor(private breakpointObserver: BreakpointObserver,
              private progressBarService: ProgressBarService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.sidenavCollapsed = true;
    this.progressBar$ = this.progressBarService.updateProgressBar.subscribe((mode: string) => {
      this.progressBarMode = mode;
      this.cdr.detectChanges();
    });
  }

  toggleCollapse($event: boolean) {
    this.sidenavCollapsed = $event;
  }

  ngOnDestroy() {
    this.progressBar$.unsubscribe();
  }

}
