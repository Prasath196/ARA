import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { TreeItem, FlatNode } from 'src/app/model/treeitem';

@Component({
  selector: 'app-site-tree',
  templateUrl: './site-tree.component.html',
  styleUrls: ['./site-tree.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SiteTreeComponent implements OnInit {

  voiceText: string;
  treeSource = [];

  constructor() { }

  ngOnInit(): void {
    this.treeSource=[
      {
        name: "site",
        id: 0,
        type: "site",
        parent: 0,
        children: [{
          name: "space",
          id: 1,
          parent: 0,
          type: "space",
          children: [{
            name: "sub space",
            id: 2,
            type: "space",
            parent: 1
          }]
        }]
      }
    ];
  }
}
