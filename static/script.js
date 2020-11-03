document.getElementById('Search-S').addEventListener('click', getResults);
document.getElementById('Additem').addEventListener('click', createSched);
document.getElementById('Plus').addEventListener('click', Plus);
document.getElementById('AddCoursesButton').addEventListener('click', Addcourse);
document.getElementById('Searchitem').addEventListener('click', getSched);

function colorIndicator(value) {
    if(value.includes("LAB")) {
        return 'rgb(19, 71, 6)';
    }
    else if(value.includes("LEC")) {
        return 'rgb(133, 21, 7)';
    }
    else if(value.includes("TUT")) {
        return 'rgb(7, 30, 134)';
    } 
}

function getResults() {
    const SubjectCode = String(document.getElementById('Subject-1').value);
    const CourseCode = String(document.getElementById('Course-1').value);
    const ComponentCode = String(document.getElementById('Component-1').value);
    const l = document.getElementById('resultsDisplay');
    while (l.firstChild) {
        l.removeChild(l.firstChild);
    }
    if((SubjectCode.length > 0 && SubjectCode.length < 15) && (CourseCode.length <= 0) && (ComponentCode.length <= 0)) {
        fetch(`/api/courses/subjects/${SubjectCode}`)
        .then(res => res.json()
        .then(data => {
            console.log(data);
            data.forEach(e => {
                const item = document.createElement('li');
                const ca = [];
                const cb = [];
                const table = document.createElement('table');
                const r1 = document.createElement('tr');
                const r2 = document.createElement('tr');
               
                for(i = 1; i < 10; i++) {
                    ca[i] = document.createElement('td');
                    cb[i] = document.createElement('td');
                }
        
                ca[1].appendChild(document.createTextNode("Section"));
                cb[1].appendChild(document.createTextNode(`${String(e.course_info[0].class_section)}`));
                ca[2].appendChild(document.createTextNode("Component"));
                cb[2].style.backgroundColor = colorIndicator(`${e.course_info[0].ssr_component}`);
                cb[2].appendChild(document.createTextNode(`${String(e.course_info[0].ssr_component)}`));
                ca[3].appendChild(document.createTextNode("Class Number"));
                cb[3].appendChild(document.createTextNode(`${String(e.course_info[0].class_nbr)}`)); 
                ca[4].appendChild(document.createTextNode("Days"));
                cb[4].appendChild(document.createTextNode(`${String(e.course_info[0].days)}`));
                ca[5].appendChild(document.createTextNode("Start Time"));              
                cb[5].appendChild(document.createTextNode(`${String(e.course_info[0].start_time)}`));  
                ca[6].appendChild(document.createTextNode("End Time"));
                cb[6].appendChild(document.createTextNode(`${String(e.course_info[0].end_time)}`));
                ca[7].appendChild(document.createTextNode("Campus"));
                cb[7].appendChild(document.createTextNode(`${String(e.course_info[0].campus)}`));
                ca[8].appendChild(document.createTextNode("Instructor"));
                cb[8].appendChild(document.createTextNode(`${String(e.course_info[0].instructors)}`));
                ca[9].appendChild(document.createTextNode("Status"));
                cb[9].appendChild(document.createTextNode(`${String(e.course_info[0].enrl_stat)}`));

                for(i = 1; i < 10; i++) {
                    r1.appendChild(ca[i]);
                    r2.appendChild(cb[i]);
                }

                table.appendChild(r1);
                table.appendChild(r2);
                const br = document.createElement("br");
                const text = document.createTextNode(`${String(e.subject)} ${String(e.catalog_nbr)} - ${String(e.className)}`);
                const description = document.createTextNode(`${String(e.description)}`);   
                const span = document.createElement('span');
                span.id = "desc";  
                span.appendChild(description);           
                item.appendChild(text);
                item.appendChild(br);
                item.appendChild(span);
                item.appendChild(table);
                l.appendChild(item);
            });
        }))
    }
    else if((SubjectCode.length > 0 && SubjectCode.length < 15) && (CourseCode.length > 0 && CourseCode.length < 8) && (ComponentCode.length <= 0)){
        fetch(`/api/courses/subjects/${SubjectCode}/${CourseCode}`)
        .then(res => res.json()
        .then(data => {
            console.log(data);
            data.forEach(e => {
                const item = document.createElement('li');
                const ca = [];
                const cb = [];
                const table = document.createElement('table');
                const r1 = document.createElement('tr');
                const r2 = document.createElement('tr');
               
                for(i = 1; i < 10; i++) {
                    ca[i] = document.createElement('td');
                    cb[i] = document.createElement('td');
                }
        
                ca[1].appendChild(document.createTextNode("Section"));
                cb[1].appendChild(document.createTextNode(`${String(e.course_info[0].class_section)}`));
                ca[2].appendChild(document.createTextNode("Component"));
                cb[2].style.backgroundColor = colorIndicator(`${e.course_info[0].ssr_component}`);
                cb[2].appendChild(document.createTextNode(`${String(e.course_info[0].ssr_component)}`));
                ca[3].appendChild(document.createTextNode("Class Number"));
                cb[3].appendChild(document.createTextNode(`${String(e.course_info[0].class_nbr)}`)); 
                ca[4].appendChild(document.createTextNode("Days"));
                cb[4].appendChild(document.createTextNode(`${String(e.course_info[0].days)}`));
                ca[5].appendChild(document.createTextNode("Start Time"));              
                cb[5].appendChild(document.createTextNode(`${String(e.course_info[0].start_time)}`));  
                ca[6].appendChild(document.createTextNode("End Time"));
                cb[6].appendChild(document.createTextNode(`${String(e.course_info[0].end_time)}`));
                ca[7].appendChild(document.createTextNode("Campus"));
                cb[7].appendChild(document.createTextNode(`${String(e.course_info[0].campus)}`));
                ca[8].appendChild(document.createTextNode("Instructor"));
                cb[8].appendChild(document.createTextNode(`${String(e.course_info[0].instructors)}`));
                ca[9].appendChild(document.createTextNode("Status"));
                cb[9].appendChild(document.createTextNode(`${String(e.course_info[0].enrl_stat)}`));

                for(i = 1; i < 10; i++) {
                    r1.appendChild(ca[i]);
                    r2.appendChild(cb[i]);
                }

                table.appendChild(r1);
                table.appendChild(r2);
                const br = document.createElement("br");
                const text = document.createTextNode(`${String(e.subject)} ${String(e.catalog_nbr)} - ${String(e.className)}`);
                const description = document.createTextNode(`${String(e.catalog_description)}`);   
                const span = document.createElement('span');
                span.id = "desc";  
                span.appendChild(description);           
                item.appendChild(text);
                item.appendChild(br);
                item.appendChild(span);
                item.appendChild(table);
                l.appendChild(item);
            });
        }))
    }
    else if((SubjectCode.length > 0 && SubjectCode.length < 15) && (CourseCode.length > 0 && CourseCode.length < 8) && (ComponentCode.length > 0 && ComponentCode.length < 5)){
        fetch(`/api/courses/subjects/${SubjectCode}/${CourseCode}/${ComponentCode}`)
        .then(res => res.json()
        .then(data => {
            console.log(data);
            data.forEach(e => {
                const item = document.createElement('li');
                const ca = [];
                const cb = [];
                const table = document.createElement('table');
                const r1 = document.createElement('tr');
                const r2 = document.createElement('tr');
               
                for(i = 1; i < 10; i++) {
                    ca[i] = document.createElement('td');
                    cb[i] = document.createElement('td');
                }
        
                ca[1].appendChild(document.createTextNode("Section"));
                cb[1].appendChild(document.createTextNode(`${String(e.course_info[0].class_section)}`));
                ca[2].appendChild(document.createTextNode("Component"));
                cb[2].style.backgroundColor = colorIndicator(`${e.course_info[0].ssr_component}`);
                cb[2].appendChild(document.createTextNode(`${String(e.course_info[0].ssr_component)}`));
                ca[3].appendChild(document.createTextNode("Class Number"));
                cb[3].appendChild(document.createTextNode(`${String(e.course_info[0].class_nbr)}`)); 
                ca[4].appendChild(document.createTextNode("Days"));
                cb[4].appendChild(document.createTextNode(`${String(e.course_info[0].days)}`));
                ca[5].appendChild(document.createTextNode("Start Time"));              
                cb[5].appendChild(document.createTextNode(`${String(e.course_info[0].start_time)}`));  
                ca[6].appendChild(document.createTextNode("End Time"));
                cb[6].appendChild(document.createTextNode(`${String(e.course_info[0].end_time)}`));
                ca[7].appendChild(document.createTextNode("Campus"));
                cb[7].appendChild(document.createTextNode(`${String(e.course_info[0].campus)}`));
                ca[8].appendChild(document.createTextNode("Instructor"));
                cb[8].appendChild(document.createTextNode(`${String(e.course_info[0].instructors)}`));
                ca[9].appendChild(document.createTextNode("Status"));
                cb[9].appendChild(document.createTextNode(`${String(e.course_info[0].enrl_stat)}`));

                for(i = 1; i < 10; i++) {
                    r1.appendChild(ca[i]);
                    r2.appendChild(cb[i]);
                }

                table.appendChild(r1);
                table.appendChild(r2);
                const br = document.createElement("br");
                const text = document.createTextNode(`${String(e.subject)} ${String(e.catalog_nbr)} - ${String(e.className)}`);
                const description = document.createTextNode(`${String(e.catalog_description)}`);  
                const span = document.createElement('span');
                span.id = "desc";  
                span.appendChild(description);           
                item.appendChild(text);
                item.appendChild(br);
                item.appendChild(span);
                item.appendChild(table);
                l.appendChild(item);
            });
        }))
    }
}
