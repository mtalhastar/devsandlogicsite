import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Send, Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function ReviewForm() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    company: '',
    content: '',
    rating: 0,
    imageUrl: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    // Prevent submission if image is still uploading
    if (uploadingImage) {
      toast.error('Please wait for image upload to complete');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare submission data - include imageUrl if it was uploaded to Cloudinary
      const submitData: any = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role?.trim() || '',
        company: formData.company?.trim() || '',
        content: formData.content.trim(),
        rating: formData.rating,
      };
      
      // ALWAYS include imageUrl if it exists in formData (it should be a Cloudinary URL)
      console.log('🔍 Checking formData.imageUrl before submission:');
      console.log('  - formData.imageUrl exists?', !!formData.imageUrl);
      console.log('  - formData.imageUrl value:', formData.imageUrl);
      console.log('  - formData.imageUrl type:', typeof formData.imageUrl);
      console.log('  - formData.imageUrl length:', formData.imageUrl?.length);
      
      if (formData.imageUrl) {
        const trimmedUrl = String(formData.imageUrl).trim();
        if (trimmedUrl.length > 0) {
          submitData.imageUrl = trimmedUrl;
          console.log('✅ Including Cloudinary imageUrl in submission:', submitData.imageUrl);
          console.log('✅ imageUrl length in submitData:', submitData.imageUrl.length);
        } else {
          console.log('⚠️ formData.imageUrl is empty after trim');
        }
      } else {
        console.log('❌ No imageUrl in formData');
      }

      console.log('📤 Submitting review to database with data:', JSON.stringify(submitData, null, 2));
      console.log('📤 submitData.imageUrl:', submitData.imageUrl);

      const response = await fetch('/api/reviews/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Thank you for your review! It will be reviewed and published soon.');
        setFormData({ name: '', email: '', role: '', company: '', content: '', rating: 0, imageUrl: '' });
        setHoveredRating(0);
        setShowForm(false);
      } else {
        toast.error(data.error || 'Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size must be less than 10MB');
      return;
    }

    setUploadingImage(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: uploadFormData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to upload image');
      }

      if (result.url) {
        // Image successfully uploaded to Cloudinary, now store the URL
        const cloudinaryUrl = result.url;
        setFormData({ ...formData, imageUrl: cloudinaryUrl });
        console.log('✅ Image uploaded to Cloudinary, URL stored:', cloudinaryUrl);
        toast.success('Image uploaded successfully! Ready to submit review.');
      } else {
        console.error('❌ No URL in upload response:', result);
        toast.error('Image uploaded but no URL returned');
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error(`Error uploading image: ${error.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  if (!showForm) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Button
          onClick={() => setShowForm(true)}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-8 py-6 rounded-xl text-lg font-medium"
        >
          Post Your Review
          <Send className="ml-2 w-5 h-5" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Share Your Experience</h3>
          <p className="text-gray-400">We'd love to hear about your experience working with us!</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setShowForm(false);
            setFormData({ name: '', email: '', role: '', company: '', content: '', rating: 0, imageUrl: '' });
            setHoveredRating(0);
          }}
          className="text-gray-400 hover:text-white hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Your Name *"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-purple-500"
            required
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="Your Email *"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-purple-500"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Input
              type="text"
              placeholder="Your Role (Optional)"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-purple-500"
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Company (Optional)"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-purple-500"
            />
          </div>
        </div>
        
        {/* Rating */}
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Rating *</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({...formData, rating: star})}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || formData.rating)
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-500'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Your Photo (Optional)</label>
          <div className="space-y-3">
            {formData.imageUrl && (
              <div className="relative group">
                <img 
                  src={formData.imageUrl} 
                  alt="Review preview" 
                  className="w-24 h-24 object-cover rounded-lg border border-white/10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFormData({...formData, imageUrl: ''})}
                  className="absolute -top-2 -right-2 bg-red-500/80 hover:bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            )}
            <div className="flex items-center gap-3">
              <label className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />
                <div className="flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-white/20 rounded-lg cursor-pointer hover:border-purple-500/50 transition-colors bg-white/5">
                  {uploadingImage ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                      <span className="text-sm text-gray-400">Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-400">
                        {formData.imageUrl ? 'Change Photo' : 'Upload Photo'}
                      </span>
                    </>
                  )}
                </div>
              </label>
              {formData.imageUrl && (
                <Input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  placeholder="Or paste image URL"
                  className="flex-1 bg-white/5 border-white/10 text-white focus:border-purple-500"
                />
              )}
            </div>
            <p className="text-xs text-gray-500">Upload your photo or paste a URL. Max size: 10MB</p>
          </div>
        </div>
        
        <div>
          <Textarea
            placeholder="Your Review *"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-[120px] rounded-xl focus:border-purple-500 resize-none"
            required
          />
        </div>
        
        <Button 
          type="submit"
          size="lg"
          disabled={isSubmitting || formData.rating === 0 || uploadingImage}
          className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white h-12 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Review
              <Send className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}

