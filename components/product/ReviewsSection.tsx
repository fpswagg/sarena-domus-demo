'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, X } from 'lucide-react';

interface Review {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    comment: string;
}

const reviews: Review[] = [
    {
        id: 1,
        name: 'James Webb',
        avatar: 'https://i.pravatar.cc/100?img=12',
        rating: 5,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        id: 2,
        name: 'James Webb',
        avatar: 'https://i.pravatar.cc/100?img=12',
        rating: 5,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
];

const ReviewsSection = () => {
    const [showReviewModal, setShowReviewModal] = useState(false);
    const hasReviews = reviews.length > 0;

    return (
        <section className="py-8 md:py-12">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
                {hasReviews ? (
                    <>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                            <div className="flex items-center gap-2">
                                <Star size={20} className="fill-yellow-400 text-yellow-400" />
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">4.8 (37 Reviews)</h2>
                            </div>
                            <button 
                                onClick={() => setShowReviewModal(true)}
                                className="bg-slate-800 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors cursor-pointer w-full sm:w-auto"
                            >
                                Write a Review
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {reviews.map((review) => (
                                <div key={review.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0 ring-2 ring-gray-100">
                                        <Image
                                            src={review.avatar}
                                            alt={review.name}
                                            width={48}
                                            height={48}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-semibold text-gray-900 text-sm">{review.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1 mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <Star 
                                                    key={i} 
                                                    size={14} 
                                                    className={i < review.rating 
                                                        ? 'fill-yellow-400 text-yellow-400' 
                                                        : 'fill-gray-200 text-gray-200'
                                                    } 
                                                />
                                            ))}
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                            <button className="text-slate-800 font-medium hover:text-slate-900 transition-colors cursor-pointer text-sm md:text-base">
                                See All Reviews
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Star size={24} className="text-gray-400" />
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">No Reviews Yet</h2>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-8 mb-8 max-w-md mx-auto">
                            <p className="text-gray-500 font-medium">MASCOT</p>
                        </div>
                        <button 
                            onClick={() => setShowReviewModal(true)}
                            className="bg-slate-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors cursor-pointer"
                        >
                            Be the first to write a review
                        </button>
                    </div>
                )}
            </div>

            {/* Review Modal */}
            {showReviewModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Write your review about Locality or the Location</h3>
                            <button 
                                onClick={() => setShowReviewModal(false)}
                                className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            {/* Rating Categories */}
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-700 mb-2">Environment (Neighborhood, Roads, Safety, Cleanliness)</p>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={24} className="fill-yellow-400 text-yellow-400 cursor-pointer" />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700 mb-2">Commuting (Public Transport, Parking, Connectivity, Traffic)</p>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={24} className={i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'} cursor-pointer />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700 mb-2">Places of Interest (Schools, Hospitals, Restaurants, Markets)</p>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={24} className={i < 5 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'} cursor-pointer />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Input Fields */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Write a Title"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="own-property" className="w-4 h-4" />
                                <label htmlFor="own-property" className="text-sm text-gray-700 cursor-pointer">I Own a Property Here</label>
                            </div>

                            <div>
                                <textarea
                                    placeholder="Write a Review"
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800"
                                />
                            </div>

                            <button className="w-full bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors cursor-pointer">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ReviewsSection;

