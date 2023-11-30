import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HtmlGenerationService } from '../services/html-generation.service';
import { AnimationService } from '../services/animation.service';
import { FileHandlingService } from '../services/file-handling.service';
import { DownloadHmtlService } from '../services/download-hmtl.service';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss'],
})
export class ImageFormComponent {
  imageForm!: FormGroup;
  selectedFile!: File;
  previewUrl!: string;

  constructor(
    private formBuilder: FormBuilder,
    private htmlGenerationService: HtmlGenerationService,
    private animationSevice: AnimationService,
    private fileHandlingService: FileHandlingService,
    private downloadHtmlService: DownloadHmtlService
  ) {}

  ngOnInit() {
    this.imageForm = this.formBuilder.group({
      image: [null, Validators.required],
      animation: ['', Validators.required],
      imageSize: [''],
      containerWidth: [''],
      containerHeight: [''],
      imagePositionX: [''],
      imagePositionY: [''],
      useImageContainer: [false],
    });
  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const fileList: FileList | null = inputElement.files;

    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
      this.previewImage();
    }
  }

  onSubmit() {
    const htmlContent = this.generateHtmlContent();
    this.downloadHtmlFile(htmlContent);
  }

  private async previewImage() {
    try {
      this.previewUrl = await this.fileHandlingService.readFileAsDataUrl(
        this.selectedFile
      );
    } catch (error) {
      console.error(error);
    }
  }

  private generateHtmlContent(): string {
    return this.htmlGenerationService.generateHtmlContent(
      this.imageForm,
      this.previewUrl
    );
  }

  getAnimationStyle(animationType: string): string {
    return this.animationSevice.getAnimationStyle(animationType);
  }

  private downloadHtmlFile(content: string) {
    this.downloadHtmlService.downloadHtmlFile(content, 'generated.html');
  }
}
