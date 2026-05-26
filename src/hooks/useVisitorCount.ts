import { useEffect, useState } from 'react';

const VISITOR_STORAGE_KEY = 'arafahJourneyVisitorCounted';
const COUNTAPI_NAMESPACE = 'arafah-journey-app';
const COUNTAPI_KEY = 'visitor-count';

interface CountApiResponse {
  value?: number;
  error?: string;
}

function getCountUrl() {
  return `https://api.countapi.xyz/get/${COUNTAPI_NAMESPACE}/${COUNTAPI_KEY}`;
}

function hitCountUrl() {
  return `https://api.countapi.xyz/hit/${COUNTAPI_NAMESPACE}/${COUNTAPI_KEY}`;
}

function hasAlreadyCounted(): boolean {
  try {
    return localStorage.getItem(VISITOR_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function markAsCounted() {
  try {
    localStorage.setItem(VISITOR_STORAGE_KEY, 'true');
  } catch {
    // ignore storage failures
  }
}

export function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;
    const alreadyCounted = hasAlreadyCounted();
    const url = alreadyCounted ? getCountUrl() : hitCountUrl();

    fetch(url)
      .then((res) => res.json() as Promise<CountApiResponse>)
      .then((data) => {
        if (canceled) return;
        if (data.value === undefined) {
          setError('فشل قراءة عدد الزوار');
          return;
        }
        setCount(data.value);
        if (!alreadyCounted) {
          markAsCounted();
        }
      })
      .catch(() => {
        if (canceled) return;
        setError('تعذّر الاتصال بعداد الزوار');
      })
      .finally(() => {
        if (!canceled) {
          setLoading(false);
        }
      });

    return () => {
      canceled = true;
    };
  }, []);

  return { count, loading, error };
}
