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

function createSched() {
    if(String(document.getElementById('name').value.length) > 0 && String(document.getElementById('name').value.length) < 20) {
        const schedName = {
            scheduleName: document.getElementById('name').value
        }
        document.getElementById('courseAdder').style.display = "block";
        fetch('/api/courses/schedules', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(schedName)
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then(data => {
                    console.log(data);
                })
                .catch(err => console.log('Schedule could not be created'))
            }
            else {
                console.log('Error: ', res.status);
            }
        })
        .catch()
    }   
}

function Plus() {
    const quantity = document.getElementById("Qinput").value;
    const table = document.getElementById("mytable");
    if(quantity > 0) {
        for(i = 0; i < quantity; i++) {
            const s = document.createElement('td');
            i1 = document.createElement('input');
            i1.setAttribute('id',`tda${i}`);
            i1.setAttribute('type','text');
            s.appendChild(i1);

            const c = document.createElement('td');
            i2 = document.createElement('input');
            i2.setAttribute('id',`tdb${i}`);
            i2.setAttribute('type','text');
            c.appendChild(i2);

            const r = document.createElement('tr');
            r.appendChild(s);
            r.appendChild(c);
            table.appendChild(r);
        }
    }
}

function Addcourse() {
    const subjectAndCourse = [];
    
    for(i = 0; i < document.getElementById("Qinput").value; i++) {
        if((document.getElementById(`tda${i}`).value.length > 0 && document.getElementById(`tda${i}`).value.length < 10) 
        && (document.getElementById(`tdb${i}`).value.length > 0 && document.getElementById(`tdb${i}`).value.length < 8)
        && (document.getElementById('name').value.length > 0 && document.getElementById('name').value.length < 20)
        && (document.getElementById('Qinput').value > 0 && document.getElementById('Qinput').value < 10)) {
            subjectAndCourse[i] = {subject: document.getElementById(`tda${i}`).value, catalog_nbr: document.getElementById(`tdb${i}`).value}
    }

    fetch(`/api/courses/schedules/${document.getElementById('name').value}`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(subjectAndCourse)
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then(data => {
                    console.log(data);
                })
                .catch(err => console.log('Courses could not be Added'))
            }
            else {
                console.log('Error: ', res.status);
            }
        })
        .catch()
    } 
    document.getElementById('name').value = "";
    document.getElementById('Qinput').value = "";

    for(i = 0; i < document.getElementById("Qinput").value; i++) {
        document.getElementById(`tda${i}`).value = "";
        document.getElementById(`tdb${i}`).value = "";
    }
}  

function getSched() {
    const l = document.getElementById('schedDisplay');
    while (l.firstChild) {
        l.removeChild(l.firstChild);
    }
    if(document.getElementById('schedName').value.length > 0 && document.getElementById('schedName').value.length < 20) {
        const title = document.createTextNode(`Schedule Name : ${String(document.getElementById('schedName').value)}`);
        const ulSpan = document.createElement('span');
        ulSpan.id = "nameofS";  
        ulSpan.appendChild(title); 
        l.appendChild(ulSpan);

        fetch(`/api/courses/schedules/${(document.getElementById('schedName').value)}`)
        .then(res => res.json()
        .then(data => {
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
}
