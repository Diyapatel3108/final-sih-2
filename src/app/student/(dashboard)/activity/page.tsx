'use client';
import { useState, useEffect } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, BrainCircuit, Code, Download, Mic, MonitorPlay, Presentation, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import { useAuth } from '@/components/layout/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { cn } from '@/lib/utils';

// Define types for better organization
type ActivityType = 'Curriculum' | 'Non-Curriculum';
type CurriculumSubActivity = 'coding' | 'English' | 'data structure' | 'data science';
type CodingLanguage = 'python' | 'c++' | 'java';
type NonCurriculumSubActivity = 'Public Speaking and Debate Forums' | 'interview preparation' | 'personality development' | 'soft skills';

interface YouTubeLink {
  coding: {
    python: string;
    'c++': string;
    java: string;
  };
  'data structure': string;
  'data science': string;
  English: string;
  'Public Speaking and Debate Forums': string;
  'interview preparation': string;
  'personality development': string;
  'soft skills': string;
}

const curriculumActivities: { name: CurriculumSubActivity, icon: React.ReactNode, description: string }[] = [
    { name: 'coding', icon: <Code />, description: "Learn to code in Python, C++, or Java." },
    { name: 'English', icon: <BookOpen />, description: "Improve your language and communication skills." },
    { name: 'data structure', icon: <BrainCircuit />, description: "Understand fundamental data organization." },
    { name: 'data science', icon: <Sparkles />, description: "Explore the world of data analysis and insights." },
];

const codingLanguages: CodingLanguage[] = ['python', 'c++', 'java'];

const nonCurriculumActivities: { name: NonCurriculumSubActivity, icon: React.ReactNode, description: string }[] = [
    { name: 'Public Speaking and Debate Forums', icon: <Mic />, description: "Build confidence in public speaking."},
    { name: 'interview preparation', icon: <Presentation />, description: "Prepare for your dream job interview."},
    { name: 'personality development', icon: <Users />, description: "Enhance your personal and social skills."},
    { name: 'soft skills', icon: <MonitorPlay />, description: "Develop essential workplace soft skills." },
];

// YouTube Player Component
const YouTubePlayer = ({ videoId }: { videoId: string }) => {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={videoId}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

// Main Activity Component
const Activity = ({ youtubeLinks, notes }: { youtubeLinks: YouTubeLink, notes: any }) => {
  const [activityType, setActivityType] = useState<ActivityType | null>(null);
  const [subActivity, setSubActivity] = useState<CurriculumSubActivity | NonCurriculumSubActivity | null>(null);
  const [codingLanguage, setCodingLanguage] = useState<CodingLanguage | null>(null);
  const [youtubeLink, setYoutubeLink] = useState<string | null>(null);

  const handleActivityTypeSelect = (type: ActivityType) => {
    setActivityType(type);
    setSubActivity(null);
    setCodingLanguage(null);
    setYoutubeLink(null);
  };

  const handleSubActivitySelect = (activity: CurriculumSubActivity | NonCurriculumSubActivity) => {
    setSubActivity(activity);
    if (activity !== 'coding') {
      // @ts-ignore
      setYoutubeLink(youtubeLinks[activity]);
    }
  };

  const handleCodingLanguageSelect = (language: CodingLanguage) => {
    setCodingLanguage(language);
    setYoutubeLink(youtubeLinks.coding[language]);
  };

  const resetSelection = () => {
    setActivityType(null);
    setSubActivity(null);
    setCodingLanguage(null);
    setYoutubeLink(null);
  };

  const downloadNotesAsPdf = () => {
    const doc = new jsPDF();
    let note = '';
    let title = '';

    if (activityType === 'Curriculum') {
        if (subActivity === 'coding' && codingLanguage) {
            note = notes.curriculum.coding[codingLanguage];
            title = `${codingLanguage.toUpperCase()} Notes`;
        } else if (subActivity && subActivity !== 'coding') {
            note = notes.curriculum[subActivity as Exclude<CurriculumSubActivity, 'coding'>];
            title = `${subActivity.charAt(0).toUpperCase() + subActivity.slice(1)} Notes`;
        }
    } else if (activityType === 'Non-Curriculum' && subActivity) {
        note = notes['non-curriculum'][subActivity as NonCurriculumSubActivity];
        title = `${subActivity.charAt(0).toUpperCase() + subActivity.slice(1)} Notes`;
    }

    if (title && note) {
        doc.setFontSize(18);
        doc.text(title, 14, 22);
        doc.setFontSize(11);
        const lines = doc.splitTextToSize(note.trim(), 180);
        let y = 35;
        const pageHeight = doc.internal.pageSize.height;

        for (let i = 0; i < lines.length; i++) {
            if (y > pageHeight - 20) {
                doc.addPage();
                y = 20;
            }
            doc.text(lines[i], 14, y);
            y += 7;
        }
        doc.save(`${title.replace(/ /g, '_')}.pdf`);
    }
  };

  if (youtubeLink) {
    const isPythonCoding = activityType === 'Curriculum' && subActivity === 'coding' && codingLanguage === 'python';
    const isCppCoding = activityType === 'Curriculum' && subActivity === 'coding' && codingLanguage === 'c++';

    return (
      <Card>
        <CardHeader>
          <CardTitle>Learn and Grow</CardTitle>
        </CardHeader>
        <CardContent>
          <YouTubePlayer videoId={youtubeLink} />
          <div className="flex space-x-4 mt-4">
            <Button onClick={resetSelection}>
              <ArrowLeft className="mr-2" /> Back to Activities
            </Button>
            {(isPythonCoding && notes.curriculum.coding.python) || (isCppCoding && notes.curriculum.coding['c++']) ? (
              <a
                href={isPythonCoding ? notes.curriculum.coding.python : notes.curriculum.coding['c++']}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "default" }))}
              >
                <Download className="mr-2" /> Download Notes
              </a>
            ) : (
              <Button onClick={downloadNotesAsPdf}>
                <Download className="mr-2" /> Download Notes
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Your Activity</CardTitle>
        <CardDescription>Select an activity to start your learning journey.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!activityType ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="cursor-pointer rounded-lg border bg-card text-card-foreground shadow-sm p-6 hover:shadow-md transition-shadow"
              onClick={() => handleActivityTypeSelect('Curriculum')}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Curriculum Activity</p>
                  <p className="text-sm text-muted-foreground">Activities related to your main course of study.</p>
                </div>
              </div>
            </div>
            <div 
              className="cursor-pointer rounded-lg border bg-card text-card-foreground shadow-sm p-6 hover:shadow-md transition-shadow"
              onClick={() => handleActivityTypeSelect('Non-Curriculum')}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Sparkles className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Non-Curriculum Activity</p>
                  <p className="text-sm text-muted-foreground">Activities for personal and professional development.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Button onClick={resetSelection} variant="outline" className="mb-4">
              <ArrowLeft className="mr-2" /> Back
            </Button>
            <h2 className="text-xl font-semibold mb-2">{activityType} Activities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activityType === 'Curriculum' &&
                !subActivity &&
                curriculumActivities.map((activity) => (
                    <Card key={activity.name} className="cursor-pointer hover:shadow-lg transition-shadow text-center" onClick={() => handleSubActivitySelect(activity.name)}>
                        <CardHeader>
                           <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                            {activity.icon}
                           </div>
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="capitalize text-base">{activity.name}</CardTitle>
                             <CardDescription className="text-xs">{activity.description}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
              {activityType === 'Curriculum' && subActivity === 'coding' && !codingLanguage &&
                codingLanguages.map((lang) => (
                    <Card key={lang} className="cursor-pointer hover:shadow-lg transition-shadow text-center" onClick={() => handleCodingLanguageSelect(lang)}>
                        <CardHeader>
                             <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                                <Code />
                           </div>
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="capitalize text-base">{lang}</CardTitle>
                        </CardContent>
                    </Card>
                ))}
              {activityType === 'Non-Curriculum' &&
                !subActivity &&
                nonCurriculumActivities.map((activity) => (
                     <Card key={activity.name} className="cursor-pointer hover:shadow-lg transition-shadow text-center" onClick={() => handleSubActivitySelect(activity.name)}>
                         <CardHeader>
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                             {activity.icon}
                            </div>
                         </CardHeader>
                         <CardContent>
                             <CardTitle className="capitalize text-base">{activity.name}</CardTitle>
                             <CardDescription className="text-xs">{activity.description}</CardDescription>
                         </CardContent>
                     </Card>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function ActivityPage() {
  const { user: student, loading } = useAuth();
  const [youtubeLinks, setYoutubeLinks] = useState<YouTubeLink | null>(null);
  const [notes, setNotes] = useState<any | null>(null);

  useEffect(() => {
    if (student) {
      const fetchData = async () => {
        const { data: youtubeLinksData, error: youtubeLinksError } = await supabase
          .from('youtube_links')
          .select('*')
          .single();

        const { data: notesData, error: notesError } = await supabase
          .from('notes')
          .select('*')
          .single();

        if (youtubeLinksData) {
          setYoutubeLinks(youtubeLinksData);
        }

        if (notesData) {
          setNotes(notesData);
        }
      };
      fetchData();
    }
  }, [student]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!student || !youtubeLinks || !notes) {
    return <div>Error fetching data.</div>
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 p-4 sm:p-8">
      <div className="w-full max-w-4xl">
        <Activity youtubeLinks={youtubeLinks} notes={notes} />
        <Button variant="outline" asChild className="mt-4 w-full md:w-auto">
          <Link href="/student/dashboard">
            <ArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
