import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICaseStudy extends Document {
  title: string;
  short_description: string;
  platform: string;
  role?: string;
  icon: string;
  gradient: string;
  challenge: string;
  solutions: Array<{ title: string; description: string }>;
  technologies: Array<{ category: string; value: string }>;
  outcomes: string[];
  is_published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CaseStudySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    short_description: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [500, 'Short description cannot exceed 500 characters'],
    },
    platform: {
      type: String,
      required: [true, 'Platform is required'],
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      maxlength: [100, 'Role cannot exceed 100 characters'],
    },
    icon: {
      type: String,
      default: 'Cloud',
    },
    gradient: {
      type: String,
      default: 'from-blue-500 to-cyan-500',
    },
    challenge: {
      type: String,
      required: [true, 'Challenge is required'],
      trim: true,
    },
    solutions: [{
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
    }],
    technologies: [{
      category: {
        type: String,
        required: true,
        trim: true,
      },
      value: {
        type: String,
        required: true,
        trim: true,
      },
    }],
    outcomes: [{
      type: String,
      trim: true,
    }],
    is_published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt automatically
  }
);

// Create indexes for better query performance
CaseStudySchema.index({ platform: 1 });
CaseStudySchema.index({ is_published: 1 });
CaseStudySchema.index({ createdAt: -1 });

// Prevent model overwrite error in Next.js hot reloading
const CaseStudy: Model<ICaseStudy> = mongoose.models.CaseStudy || mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema);

export default CaseStudy;

