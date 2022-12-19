import { CommonService } from './../../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FileUpload } from 'src/app/models/FileUpload';

import { CinemaService } from 'src/services/cinema/cinema.service';
import { MovieServiceService } from 'src/services/movie-service.service';
import { ScheduleService } from 'src/services/schedule/schedule.service';
import { TypeService } from 'src/services/types/type.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-movie-form',
  templateUrl: './add-movie-form.component.html',
  styleUrls: ['./add-movie-form.component.css'],
})
export class AddMovieFormComponent implements OnInit {
  addMovieForm: any;
  cinemaRooms: any;
  types: any;
  schedules: any;
  selectedSchedules: any;
  selectedType: any;
  isLoaded=true;
  selectedFiles!: FileList;
  videoSelected!:FileList;
  currentFileUpload!: FileUpload;
  constructor(
    private fb: FormBuilder,
    private typeService: TypeService,
    private scheduleService: ScheduleService,
    private cinemaService: CinemaService,
    private movieService: MovieServiceService,
    private commonService:CommonService,
    private router:Router
  ) {
    this.selectedSchedules = [];
    this.selectedType = [];
  }

  ngOnInit(): void {
    this.loadData();
    this.addMovieForm = this.fb.group({
      actor: ['', Validators.required],
      content: [''],
      director: ['', Validators.required],
      duration: ['', [Validators.pattern('^[0-9]$'), Validators.required]],
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      movie_production_company: [''],
      version: [''],
      movie_name_english: ['', Validators.required],
      movie_name_vn: ['', Validators.required],
      large_image: [''],
      small_image: [''],
      cinemaRoom: ['', Validators.required],
      schedules: this.fb.array([], Validators.required),
      types: this.fb.array([], Validators.required),
    });
  }
  addSkills() {
    let newSkill: FormGroup = this.fb.group({
      skill: '',
      exp: '',
    });

    this.allSchedules.push(newSkill);
  }
  removeSkill() {
    this.allSchedules.removeAt(0);
  }
  get allSchedules(): FormArray {
    return this.addMovieForm.get('schedules') as FormArray;
  }
  get allTypes(): FormArray {
    return this.addMovieForm.get('types') as FormArray;
  }
  addTypes() {
    let newSkill: FormGroup = this.fb.group({
      skill: '',
      exp: '',
    });

    this.allTypes.push(newSkill);
  }
  removeTypes() {
    this.allTypes.removeAt(0);
  }
  checkValue(target: any, scheduleID: number) {
    if (target.currentTarget.checked) {
      this.addSkills();
      this.selectedSchedules.push(scheduleID);
    } else {
      const index = this.selectedSchedules.indexOf(scheduleID);
      this.selectedSchedules.splice(index, 1);
      this.removeSkill();
    }
  }
  checkValueType(target: any, typeID: number) {
    if (target.currentTarget.checked) {
      this.addTypes();
      this.selectedType.push(typeID);
    } else {
      const index = this.selectedType.indexOf(typeID);
      this.selectedType.splice(index, 1);
      this.removeTypes();
    }
  }
  onSubmit() {
    (document?.querySelector('.overlay') as HTMLElement).style.display =
    'block';
    this.isLoaded = false;
    this.upload();
  }

  loadData() {
    this.cinemaService.getAllCinema(0,999999).subscribe((cinemaRooms:any) => {
      this.cinemaRooms = cinemaRooms.cinemas;
    });
    this.scheduleService.getAllSchedule().subscribe((schedules) => {
      this.schedules = schedules;
    });
    this.typeService.getAllType().subscribe((types) => {
      this.types = types;
   
    });
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  
  }
  selectFile2(event: any): void {
    this.videoSelected = event.target.files;
  
  }
  getExtendsionFile(fileName: string) {
    return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
  }
  upload(): void {
    const file = this.selectedFiles.item(0) as File;
    let typeFile = this.getExtendsionFile(file.name).toLowerCase();

    if (typeFile=='png'||typeFile=='jpg') {
      this.currentFileUpload = new FileUpload(file);
      this.commonService.pushFileToStorage(this.currentFileUpload).subscribe(
        (percentage: any) => {
     
  
        },
        (error: any) => {
          (document?.querySelector('.overlay') as HTMLElement).style.display =
    'none';
    this.isLoaded = true;
          this.commonService.popUpFailed('Add movie failed!!!')
        }
      );
    } else {
      this.commonService.popUpFailed('Must import jpg or png file and less than 5mb');
    }
      const file2= this.videoSelected.item(0) as File;
      let typeFile2= this.getExtendsionFile(file.name).toLowerCase();
  
        this.currentFileUpload = new FileUpload(file2);
        this.commonService.pushFileToStorage2(this.currentFileUpload).subscribe(
          (percentage: any) => {
       
    
          },
          (error: any) => {
            (document?.querySelector('.overlay') as HTMLElement).style.display =
      'none';
      this.isLoaded = true;
            this.commonService.popUpFailed('Add movie failed!!!')
          }
        );
   
        
    this.commonService.fileBehavior.subscribe((change)=>{
      if(this.commonService.videoUploaded==true){
      if(change==true){
       
          let addMovieObject = this.addMovieForm.value;
          addMovieObject.listSchedule = this.selectedSchedules;
          addMovieObject.listTypes = this.selectedType;
          addMovieObject.small_image=this.commonService.fileUrl
          addMovieObject.previewUrl=this.commonService.videoUrl
          this.movieService
            .addMovie(addMovieObject, this.addMovieForm.get('cinemaRoom').value)
            .subscribe(
              (response) => {
                (document?.querySelector('.overlay') as HTMLElement).style.display =
                'none';
                this.isLoaded = true;
                Swal.fire({
                  icon: 'success',    
                  title: 'Add successfully',
                });
                this.commonService.fileBehavior.unsubscribe()
               
                this.router.navigateByUrl('/admin/movie')
               
              },
              (err) => {
                (document?.querySelector('.overlay') as HTMLElement).style.display =
                'none';
                this.isLoaded = true;
                Swal.fire({
                  icon: 'error',
                  title: 'Duplicate show date',
                });
               
              }
            );
        }
     
      }
    })
  }
  
}
