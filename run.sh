#!/bin/bash

usage() { echo "Usage: $0 [-y 2012-2019] [-m 01-12] [-n filename]" 1>&2; exit 1; }

while getopts ":m:n:y:" o; do
    case "${o}" in
        y)
            y=${OPTARG}
            ;;
        m)
            m=${OPTARG}
            ;;
        n) 
            n=${OPTARG}
            ;;
        *)
            usage
            ;;
    esac
done
shift $((OPTIND-1))

if [ ! -z "${y}" ] && [ ! -z "${m}" ] && [ ! -z "${n}" ]; then
    echo "[+] Extracting ${n}.avg_rade9h.tif" 
    tar -xvzf ${n}.tgz ${n}.avg_rade9h.tif
    echo "[+] Successfully extracted" 
    echo "[+] Creating table for public.viirs_${y}_${m}" 
    sudo raster2pgsql -s 4326 -c -b 1 -R -N -3.40282346638529e+038 -I -M /home/carl/Desktop/NOAAMapLight/${y}/${n}.avg_rade9h.tif -F -t  256x256 public.viirs_${y}_${m} | psql -h localhost -d CarlPostGIS -U carl    
    echo "[+] Successfully created table."
    exit 0;
fi

usage

