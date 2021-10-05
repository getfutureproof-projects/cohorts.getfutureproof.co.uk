import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(relativeTime)
dayjs.extend(isBetween)

const PREVIEW = process.env.CONTEXT !== 'production';

const CohortContext = React.createContext();

export function useCohort(){
    return useContext(CohortContext)
}

export function CohortProvider({ children }){
    const [ list, setList ] = useState();
    const [ current, setCurrent ] = useState();
    const [ featured, setFeatured ] = useState();
    const [ available, setAvailable ] = useState();
    const [ loading, setLoading ] = useState();
    const [ error, setError ] = useState();

    const options = new URLSearchParams(useLocation().search);

    useEffect(() => {
        fetchCohorts()
    }, [])

    async function fetchCohorts(){
        try {
            setLoading(true)
            setError(false)
            let weeksOffset = 0;
            if(PREVIEW && options.get("offset")){
                weeksOffset = options.get("offset")
            }
            let today = dayjs().add(weeksOffset, 'weeks')
            const { data } = await axios.get('https://raw.githubusercontent.com/getfutureproof-admin/cohorts/main/db.json')
            let filtered = data.cohorts.filter(c => dayjs(c.startDate).isBefore(today.add(3, 'months')))
            let sorted = filtered.sort((a, b) => dayjs(b.startDate) - dayjs(a.startDate))
            let cohorts = sorted.map(c => {
                let startDate = dayjs(c.startDate)
                let endDate = c.endDate ? dayjs(c.endDate) : dayjs(c.startDate).add(13, 'weeks').subtract(3, 'days')

                let keyDates = {
                    startDate,
                    endDate,
                    previewEndDate: startDate.add(1, 'weeks'),
                    addMaterialsDate: startDate.add(4, "weeks"),
                    startInterviewsDate: endDate.subtract(4, "weeks"),
                    bondEndDate: endDate.add(8, 'weeks')
                }
                
                let descriptors = {
                    status: 'preview',
                    isLive: false,
                    showModal: false,
                    isInterviewEligible: false
                }


                if (startDate.isAfter(today)){
                    descriptors.status = 'upcoming'
                } else if (keyDates.endDate.isBefore(today)) {
                    descriptors.status = 'graduated'
                    descriptors.isLive = true
                    descriptors.showModal = true
                } else if (keyDates.addMaterialsDate.isBefore(today)) {
                    descriptors.status = 'current'
                    descriptors.isLive = true
                    descriptors.showModal = true
                } else if (keyDates.previewEndDate.isBefore(today)) {
                    descriptors.status = 'current'
                    descriptors.isLive = true
                }

                if(today.isBetween(keyDates.startInterviewsDate, keyDates.bondEndDate, null, '[]')) {
                    descriptors.isInterviewEligible = true
                }
                
                return { ...c, ...keyDates, ...descriptors }
            })

            setList(cohorts)
        } catch (e) {
            setError("Oops! There's been a problem fetching our cohorts, please try again later!")
            console.error(e);
        }
    }

    function fetchStudents(cohortName){
        return new Promise(async (resolve, reject) => {
            try {
                let { data } = await axios.get(`https://raw.githubusercontent.com/getfutureproof/fp_study_notes_hello_github/main/${cohortName.toLowerCase()}/roster.json`)
                if(data.projects){
                    for(let student of data.students) {
                        let project = data.projects[student.project]
                        student.project = project
                    }
                }
                resolve ({
                    name: cohortName[0].toUpperCase() + cohortName.slice(1).toLowerCase(),
                    ...data
                })
            } catch (e) {
                reject(e)
            }
        });
    }

    async function loadCohort(cohortName){
        if(list){
            try {
                setError(false)
                setLoading(true)
                set(null)
                let cohortData = await fetchStudents(cohortName)
                set(cohortData)
            } catch (e) {
                setError(`Oops, we can't find a cohort called ${cohortName[0].toUpperCase() + cohortName.slice(1).toLowerCase()}!`)
                console.error(e);
            } finally {
                setLoading(false)
            }
        }    
    }

    async function loadAvailable() {
        if(list){
            try {
                let interviewEligible = []
                let eligibleCohorts = list.filter(c => c.isInterviewEligible);
                setError(false)
                setLoading(true)
                set(null)
                for (let cohort of eligibleCohorts){
                    let { students } = await fetchStudents(cohort.name)
                    let unplaced = students.filter(s => !s.placement).map(s => ({ ...s, cohort: cohort.name }))
                    interviewEligible.push(...unplaced)
                }
                setAvailable(interviewEligible)
            } catch (e) {
                setError(`Oops, there has been an error finding our students who are ready to interview!`)
                console.error(e);
            } finally {
                setLoading(false)
            }
        }
    }

    const set = async (cohort) => {
        if(cohort){
            let dates = list.find(c => c.name.toLowerCase() === cohort.name.toLowerCase())
            setCurrent({ ...dates, ...cohort })
        } else {
            setCurrent(null)
        }
    };

    const feature = (feature) => setFeatured(feature)

    const clearFeatured = () => setFeatured(null)

    const helpers = {
        list, set, current,
        available,
        feature, featured, clearFeatured,
        loadCohort, loadAvailable,
        error, setError,
        loading
    }

    return (
        <CohortContext.Provider value={helpers}>
            { children }
        </CohortContext.Provider>
    )
}