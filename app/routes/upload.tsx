import type { Route } from "./+types/upload";
import { usePuterStore } from "~/lib/puter";
import Navbar from "~/components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";

export async function loader({ request }: Route.LoaderArgs) {
  return null;
}

export default function Upload() {
 const {auth,isLoading,fs,ai,kv}= usePuterStore(); 
 const navigate =useNavigate();  
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };
type AnalyzeParams = {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  file: File | null;
};

const handleAnalyze = async ({
  companyName,
  jobTitle,
  jobDescription,
  file,
}: AnalyzeParams): Promise<void> => {
  console.log(companyName, jobTitle, jobDescription, file);
    setIsProcessing(true);
    setStatusText('Uploading the file...')
   const uploadedFile = await fs.upload(file);
   if(!uploadedFile) return setStatusText('Error : Failed to upload file');
   setStatusText('Converting to image...'); 
};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

   if(!file) return;
    handleAnalyze({companyName,jobTitle,jobDescription,file});
   
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading">
          <h1>Smart feedback for your dream job</h1>

          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img
                src="/images/resume-scan.gif"
                alt="Scanning resume"
                className="w-full"
              />
            </>
          ) : (
            <h2>Drop your resume for an ATS score and improvement tips</h2>
          )}

          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-8"
            >
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  id="company-name"
                  placeholder="Company Name"
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  name="job-title"
                  id="job-title"
                  placeholder="Job Title"
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <input
                  type="text"
                  name="job-description"
                  id="job-description"
                  placeholder="Job Description"
                />
              </div>

              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              <button className="primary-button" type="submit">
                Analyse Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}