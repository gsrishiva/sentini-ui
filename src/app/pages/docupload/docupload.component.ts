import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-docupload',
  templateUrl: './docupload.component.html',
  styleUrls: ['./docupload.component.css']
})
export class DocuploadComponent implements OnInit {

  constructor(private _http: HttpClient, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      auditedBalanceSheet: [''],
      latestBankStatement: [''],
      proofOfPropritetary: [''],
      proofOfAuthSignatory: [''],
      gstDoc: [''],
      panCardDoc: [''],
      officePhotoGraphs: [''],
      securityCheque: ['']
    });
  }
  files: string[] = [];
  uploadForm: FormGroup;
  myFiles: string[] = [];
  uploadedFiles: any[] = [];
  onFileSelect(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }
  uploadDocs() {
    const formData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("file[]", this.myFiles[i]);
    }
    this._http.post(`${environment.apiUrl}/user/upload/documents`, formData).subscribe((data) => {

    })
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

}
